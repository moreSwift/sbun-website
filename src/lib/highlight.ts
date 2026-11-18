export type CodeLanguage = "toml" | "swift" | "shell" | "text";
export type CodeTone = "dark" | "light";

export type TokenKind =
  | "comment"
  | "section"
  | "key"
  | "string"
  | "number"
  | "keyword"
  | "type"
  | "method"
  | "punct"
  | "plain"
  | "space"
  | "cmd"
  | "subcmd"
  | "package"
  | "env"
  | "flag"
  | "url";

export type Token = { text: string; kind: TokenKind };

const darkClasses: Record<TokenKind, string> = {
  comment: "text-cream/55",
  section: "font-medium text-rose",
  key: "font-medium text-peach",
  string: "text-string-green",
  number: "text-terminal-blue",
  keyword: "text-rose",
  type: "text-terminal-blue",
  method: "text-peach",
  punct: "text-cream/55",
  plain: "text-cream/85",
  space: "",
  cmd: "whitespace-nowrap font-semibold text-peach",
  subcmd: "whitespace-nowrap font-semibold text-terminal-rose",
  package: "whitespace-nowrap text-terminal-blue",
  env: "whitespace-nowrap text-terminal-rose",
  flag: "whitespace-nowrap text-terminal-rose",
  url: "text-terminal-blue",
};

const lightClasses: Record<TokenKind, string> = {
  comment: "text-plum/45",
  section: "font-semibold text-rose-deep",
  key: "font-semibold text-plum",
  string: "text-string-green-light",
  number: "text-blue",
  keyword: "text-rose-deep",
  type: "text-blue",
  method: "text-rose-deep",
  punct: "text-plum/50",
  plain: "text-plum/85",
  space: "",
  cmd: "whitespace-nowrap font-semibold text-plum",
  subcmd: "whitespace-nowrap font-semibold text-rose-deep",
  package: "whitespace-nowrap text-blue",
  env: "whitespace-nowrap text-rose-deep",
  flag: "whitespace-nowrap text-rose-deep",
  url: "text-blue",
};

export function tokenClass(kind: TokenKind, tone: CodeTone): string {
  return (tone === "light" ? lightClasses : darkClasses)[kind];
}

/** Add natural wrap opportunities to long URLs and paths without changing the text. */
export function splitForWrap(text: string, kind: TokenKind): string[] {
  if (kind === "url" || kind === "string" || kind === "plain") {
    return text.split(/(?<=[/_-])/);
  }
  return [text];
}

const swiftKeywords = new Set([
  "import",
  "let",
  "var",
  "func",
  "struct",
  "class",
  "enum",
  "if",
  "else",
  "return",
  "for",
  "in",
  "while",
  "true",
  "false",
  "nil",
  "self",
  "some",
  "any",
  "throws",
  "try",
  "await",
  "async",
  "public",
  "private",
  "internal",
  "static",
]);

const swiftPattern =
  /("(?:[^"\\]|\\.)*"|\/\/[^\n]*|@[A-Za-z_]\w*|\b\d+(?:\.\d+)?\b|[A-Za-z_]\w*|\s+|.)/g;

export function tokenizeSwift(line: string): Token[] {
  const tokens: Token[] = [];
  let previousText = "";

  for (const match of line.matchAll(swiftPattern)) {
    const text = match[0];
    let kind: TokenKind = "punct";

    if (/^\s+$/.test(text)) {
      kind = "space";
    } else if (text.startsWith("//")) {
      kind = "comment";
    } else if (text.startsWith('"')) {
      kind = "string";
    } else if (text.startsWith("@")) {
      kind = "keyword";
    } else if (/^\d/.test(text)) {
      kind = "number";
    } else if (/^[A-Za-z_]/.test(text)) {
      if (swiftKeywords.has(text)) {
        kind = "keyword";
      } else if (/^[A-Z]/.test(text)) {
        kind = "type";
      } else if (
        previousText === "." ||
        line[match.index + text.length] === "("
      ) {
        kind = "method";
      } else {
        kind = "plain";
      }
    }

    tokens.push({ text, kind });
    if (kind !== "space") previousText = text;
  }

  return tokens;
}

const tomlValuePattern =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|#.*$|\b(?:true|false)\b|\b\d+(?:\.\d+)?\b|[[\],]|[^\s]+|\s+)/g;

function tokenizeTomlValue(value: string): Token[] {
  const tokens: Token[] = [];

  for (const match of value.matchAll(tomlValuePattern)) {
    const text = match[0];
    let kind: TokenKind = "plain";

    if (/^\s+$/.test(text)) kind = "space";
    else if (text.startsWith("#")) kind = "comment";
    else if (text.startsWith('"') || text.startsWith("'")) kind = "string";
    else if (/^\d/.test(text)) kind = "number";
    else if (text === "true" || text === "false") kind = "number";
    else if (/^[[\],]$/.test(text)) kind = "punct";

    tokens.push({ text, kind });
  }

  return tokens;
}

export function tokenizeToml(line: string): Token[] {
  const trimmed = line.trimStart();

  if (!trimmed) return [{ text: line, kind: "space" }];
  if (trimmed.startsWith("#")) return [{ text: line, kind: "comment" }];
  if (trimmed.startsWith("[")) return [{ text: line, kind: "section" }];

  const equalsIndex = line.indexOf("=");
  if (equalsIndex === -1) {
    if (line.trim().startsWith('"')) {
      return [{ text: line, kind: "string" }];
    } else {
      return [{ text: line, kind: "plain" }];
    }
  }

  return [
    { text: line.slice(0, equalsIndex), kind: "key" },
    { text: "=", kind: "punct" },
    ...tokenizeTomlValue(line.slice(equalsIndex + 1)),
  ];
}

const shellPattern =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|https?:\/\/[^\s]+|--?[A-Za-z0-9][\w-]*|[^\s]+|\s+)/g;

const shellSubcommands = new Set([
  "install",
  "bundle",
  "run",
  "clean",
  "create",
  "convert",
  "config",
  "devices",
  "simulators",
  "templates",
  "self",
]);

export function tokenizeShell(line: string): Token[] {
  if (line.trimStart().startsWith("#"))
    return [{ text: line, kind: "comment" }];

  const tokens: Token[] = [];
  let isFirstWord = true;

  for (const match of line.matchAll(shellPattern)) {
    const text = match[0];
    let kind: TokenKind = "plain";

    if (/^\s+$/.test(text)) {
      kind = "space";
    } else if (/^[A-Z_][A-Z0-9_]*=/.test(text)) {
      kind = "env";
    } else if (isFirstWord) {
      kind = "cmd";
      isFirstWord = false;
    } else if (/^https?:\/\//.test(text)) {
      kind = "url";
    } else if (/^["']/.test(text)) {
      kind = "string";
    } else if (/^--?[A-Za-z0-9]/.test(text)) {
      kind = "flag";
    } else if (/^[@\w][\w.@-]*\/[\w.@-]+$/.test(text)) {
      kind = "package";
    } else if (shellSubcommands.has(text)) {
      kind = "subcmd";
    }

    tokens.push({ text, kind });
  }

  return tokens;
}

export function tokenizeLine(line: string, language: CodeLanguage): Token[] {
  switch (language) {
    case "toml":
      return tokenizeToml(line);
    case "swift":
      return tokenizeSwift(line);
    case "shell":
      return tokenizeShell(line);
    default:
      return [{ text: line, kind: "plain" }];
  }
}
