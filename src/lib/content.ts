import Devices from "phosphor-svelte/lib/Devices";
import ShieldCheck from "phosphor-svelte/lib/ShieldCheck";
import Wrench from "phosphor-svelte/lib/Wrench";
import Lightning from "phosphor-svelte/lib/Lightning";
import Stack from "phosphor-svelte/lib/Stack";

export const githubUrl = "https://github.com/moreSwift/swift-bundler";
export const docsUrl = "https://swiftbundler.dev/documentation/swift-bundler";
export const discordUrl = "https://moreswift.dev/discord";
export const openCollectiveUrl = "https://opencollective.com/moreswift";

const crossUiCampaign =
  "utm_source=swiftbundler.dev&utm_medium=website&utm_campaign=better-together";
export const swiftCrossUiUrl = `https://swiftcrossui.dev/?${crossUiCampaign}`;
export const swiftCrossUiDocsUrl = `https://docs.swiftcrossui.dev/documentation/swiftcrossui/?${crossUiCampaign}`;
export const swiftCrossUiQuickStartUrl = `https://swiftcrossui.dev/#quickstart?${crossUiCampaign}`;

export const release = {
  version: "3.0.0",
  tag: "v3.0.0",
  date: "November 2026",
  downloadBase: `${githubUrl}/releases/download/v3.0.0`,
};

export const artifacts = {
  macos: `${release.downloadBase}/swift-bundler-3.0.0-macos-universal.pkg`,
  deb: `${release.downloadBase}/swift-bundler_3.0.0-1_amd64.deb`,
  rpm: `${release.downloadBase}/swift-bundler-3.0.0-1.x86_64.rpm`,
  msi: `${release.downloadBase}/swift-bundler-3.0.0-windows-x86_64.msi`,
  zip: `${release.downloadBase}/swift-bundler-3.0.0-windows-x86_64.zip`,
  tarball: `${release.downloadBase}/swift-bundler-3.0.0-linux-x86_64.tar.gz`,
};

export type SnippetLine = { text: string; accent?: boolean };

export type Bundler = {
  id: string;
  name: string;
  label: string;
  pickerPlatforms: string;
  platforms: string;
  blurb: string;
  command: string;
  output: string;
  signing: string;
  handles: string[];
  formats: string[];
  snippet: SnippetLine[];
};

const baseConfig = (icon: string, extra: SnippetLine[] = []): SnippetLine[] => [
  { text: 'config_version = "3.1.0"' },
  { text: "" },
  { text: "[apps.HelloWorld]" },
  { text: 'identifier = "dev.example.HelloWorld"' },
  { text: 'product = "HelloWorld"' },
  { text: 'version = "1.0.0"' },
  { text: `icon = "${icon}"` },
  { text: "" },
  ...extra,
];

export const accent = (text: string): SnippetLine => ({ text, accent: true });
export const plain = (text: string): SnippetLine => ({ text });

export const bundlers: Bundler[] = [
  {
    id: "darwinApp",
    name: "darwinApp",
    label: ".app",
    pickerPlatforms: "Apple platforms",
    platforms: "macOS, iOS, tvOS & visionOS",
    blurb:
      "Swift Bundler can build .app bundles for every Apple platform, with universal macOS binaries and automatic signing/provisioning for platforms that need it.",
    command: "sbun bundle",
    output: "HelloWorld.app",
    signing: "Developer ID, provisioning profiles, ad-hoc fallback",
    handles: [
      "Info.plist, entitlements and asset catalogs",
      "Icon Composer .icon files and Metal shaders",
      "Automatic provisioning and device registration",
    ],
    formats: [".app", ".dylib", ".icon"],
    snippet: baseConfig("icon.png", [
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(macOS)"'),
      accent('icon = "AppIcon.icon"'),
      accent("plist.NSHighResolutionCapable = true"),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(macCatalyst)"'),
      accent('interface_idiom = "mac"'),
    ]),
  },
  {
    id: "linuxRPM",
    name: "linuxRPM",
    label: ".rpm",
    pickerPlatforms: "Linux",
    platforms: "Linux",
    blurb: "Creates a self-contained RPM ready for package repositories.",
    command: "sbun bundle --bundler linuxRPM",
    output: "HelloWorld-1.0.0-1.x86_64.rpm",
    signing: "Not supported (yet)",
    handles: [
      "External RPM dependencies and requirements",
      "Licence and description metadata",
      ".desktop files, icons and URL schemes",
      "Paths-with-spaces workaround",
    ],
    formats: [".rpm"],
    snippet: baseConfig("icon.png", [
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(linux)"'),
      accent("dbus_activatable = true"),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "bundler(linuxRPM)"'),
      accent('requirements = ["gtk3"]'),
    ]),
  },
  {
    id: "linuxAppImage",
    name: "linuxAppImage",
    label: ".AppImage",
    pickerPlatforms: "Linux",
    platforms: "Linux",
    blurb:
      "Creates a portable Linux executable with its shared libraries and resources embedded within.",
    command: "sbun bundle --bundler linuxAppImage --strip",
    output: "HelloWorld.AppImage",
    signing: "Not supported (yet)",
    handles: [
      "A double-clickable single-file distribution",
      "Dynamic libraries with patched runpaths",
    ],
    formats: [".AppImage"],
    snippet: baseConfig("icon.png", [
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(linux)"'),
      accent("dbus_activatable = true"),
    ]),
  },
  {
    id: "linuxGeneric",
    name: "linuxGeneric",
    label: "Portable",
    pickerPlatforms: "Linux",
    platforms: "Linux",
    blurb:
      "Creates a portable Linux directory containing the executable, its shared libraries, and resources. This is the default during development. Also great for custom distribution workflows.",
    command: "sbun bundle",
    output: "HelloWorld/",
    signing: "Not supported (yet)",
    handles: [
      "Dynamic libraries copied beside the executable",
      "Resources and custom URL schemes",
      "Portable output for custom packaging",
    ],
    formats: ["directory"],
    snippet: baseConfig("icon.png", [
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(linux)"'),
      accent("dbus_activatable = true"),
    ]),
  },
  {
    id: "windowsMSI",
    name: "windowsMSI",
    label: ".msi",
    pickerPlatforms: "Windows",
    platforms: "Windows",
    blurb:
      "Creates a WiX-based MSI installer. WiX extensions and custom installation steps can be configured in Bundler.toml ",
    command: "sbun bundle --bundler windowsMSI",
    output: "HelloWorld-1.0.0-x86_64.msi",
    signing: "Certificate or Azure Artifact Signing",
    handles: [
      "WiX install, including extensions",
      "64-bit Program Files installs",
      "Custom WXS actions and app manifests",
      "PDBs excluded from release installers",
    ],
    formats: [".msi"],
    snippet: baseConfig("icon.ico", [
      accent("[apps.HelloWorld.msi]"),
      accent("wix_extensions = ["),
      accent('  "WixToolset.Util.wixext/6.0.0",'),
      accent("]"),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "bundler(windowsMSI)"'),
      accent('upgrade_code = "YOUR-UPGRADE-CODE"'),
    ]),
  },
  {
    id: "windowsGeneric",
    name: "windowsGeneric",
    label: ".zip",
    pickerPlatforms: "Windows",
    platforms: "Windows",
    blurb:
      "Creates a portable Windows directory with the executable, runtime DLLs, and resources.",
    command: "sbun bundle",
    output: "HelloWorld/",
    signing: "Executable and DLL signing supported",
    handles: [
      "DLL discovery and resource bundling",
      "GUI-subsystem linking",
      "App icon and application manifest",
      "Portable layout for zip distribution",
    ],
    formats: ["directory", ".zip"],
    snippet: baseConfig("icon.ico", [
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(windows)"'),
      accent('icon = "icon.ico"'),
    ]),
  },
  {
    id: "androidAPK",
    name: "androidAPK",
    label: ".apk",
    pickerPlatforms: "Android",
    platforms: "Android",
    blurb:
      "Builds and signs an APK, then installs and launches it on a connected device or emulator.",
    command: "sbun bundle -p android",
    output: "HelloWorld.apk",
    signing: "Not supported (yet)",
    handles: [
      "APK install and launch over adb",
      "Swift SDK, NDK and AAPT discovery",
      "Permissions and Android resources",
      "Java and Kotlin sources from libraries",
    ],
    formats: [".apk"],
    snippet: baseConfig("icon.png", [
      accent("[apps.HelloWorld.android]"),
      accent("min_sdk = 28"),
      accent("target_sdk = 35"),
      accent('permissions = ["INTERNET", "CAMERA"]'),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "bundler(androidAPK)"'),
      accent('description = "HelloWorld for Android"'),
    ]),
  },
];

export type ConfigurationFeature = {
  id: "simple-by-default" | "conditional-overlays" | "deep-customization";
  name: string;
  meta: string;
  slipTitle: string;
  blurb: string[];
  linkLabel: string;
  href: string;
  snippet: SnippetLine[];
};

export const configurationFeatures: ConfigurationFeature[] = [
  {
    id: "simple-by-default",
    name: "Simple by default",
    meta: "",
    slipTitle: "Simple by default",
    blurb: [
      "Swift Bundler's abstractions mean that most apps don't need any platform-specific configuration.",
      "Only three properties are required to start shipping to every major platform: product, identifier, and version. Everything else is optional.",
    ],
    linkLabel: "Configuration reference",
    href: "https://docs.swiftbundler.dev/documentation/swift-bundler/configuration",
    snippet: [
      plain('config_version = "3.1.0"'),
      plain(""),
      plain("[apps.HelloWorld]"),
      accent('product = "HelloWorld"'),
      accent('identifier = "dev.example.HelloWorld"'),
      accent('version = "1.0.0"'),
      plain(""),
      plain("# Some common optional propertioes"),
      plain('description = "A basic app."'),
      plain('icon = "icon.png"'),
      plain('license = "Apache-2.0"'),
      plain('url_schemes = ["myscheme"]'),
    ],
  },
  {
    id: "deep-customization",
    name: "Deep customization",
    meta: "",
    slipTitle: "Deep customization",
    blurb: [
      "There's no need to touch Gradle just because you want to pull in some Java code, and there's no need to touch an Xcode project just because you want to customize your Info.plist file",
      "Configure anything from Android permissions to your Windows application manifest, all in one configuration file.",
    ],
    linkLabel: "Configuration reference",
    href: "https://docs.swiftbundler.dev/documentation/swift-bundler/configuration",
    snippet: [
      plain('config_version = "3.1.0"'),
      plain(""),
      plain("[apps.HelloWorld]"),
      plain('identifier = "dev.example.HelloWorld"'),
      plain('product = "HelloWorld"'),
      plain('version = "1.0.0"'),
      plain(""),
      accent('android.permissions = ["INTERNET", "CAMERA"]'),
      plain(""),
      accent("windows.manifest.trustInfo.security.requestedPrivileges = ["),
      accent("  {"),
      accent("    requestedExecutionLevel = {"),
      accent('      level = "requireAdministrator",'),
      accent("      uiAccess = false"),
      accent("    }"),
      accent("  }"),
      accent("]"),
    ],
  },
  {
    id: "conditional-overlays",
    name: "Conditional overlays",
    meta: "",
    slipTitle: "Conditional overlays",
    blurb: [
      "Swift Bundler's powerful overlay system lets you share defaults between platforms and extend them with platform- or bundler-specific overlays.",
    ],
    linkLabel: "Configuration reference",
    href: "https://docs.swiftbundler.dev/documentation/swift-bundler/configuration",
    snippet: [
      plain('config_version = "3.1.0"'),
      plain(""),
      plain("[apps.HelloWorld]"),
      plain('product = "HelloWorld"'),
      plain('identifier = "dev.example.HelloWorld"'),
      plain('version = "1.0.0"'),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(macOS)"'),
      accent("plist.NSHighResolutionCapable = true"),
      plain(""),
      accent("[[apps.HelloWorld.overlays]]"),
      accent('condition = "platform(iOS)"'),
      accent("plist.UISupportedInterfaceOrientations = ["),
      accent('  "UIInterfaceOrientationPortrait"'),
      accent("]"),
    ],
  },
];

export type Feature = {
  title: string;
  body: string;
  size: "wide" | "normal";
  icon: any;
};

export const features: Feature[] = [
  {
    title: "Conditional overlays",
    body: "Share defaults between platforms and use platform- or bundler-specific overlays to fine-tune your app for each destination.",
    size: "wide",
    icon: Stack,
  },
  {
    title: "Signing",
    body: "3.0 generates provisioning profiles for iOS devices, automatically discovers certificates on macOS and Windows, and supports Azure Artifact Signing on Windows.",
    size: "normal",
    icon: ShieldCheck,
  },
  {
    title: "Hot reloading",
    body: "Running apps with --hot and Swift Bundler swaps your app’s code over a local TCP connection. Avoid relaunching or losing state just to preview a UI tweak. Requires a compatible UI framework.",
    size: "wide",
    icon: Lightning,
  },
  {
    title: "Manage devices",
    body: "Managing Apple and Android simulators and devices is done with a unified set of commands. There's no learning curve when switching from one platform to another.",
    size: "normal",
    icon: Devices,
  },
  {
    title: "Custom builders",
    body: "Pull CMake projects or prebuilt artifacts into your app's build with custom builders. Custom builders can also build helper executables, like an updater, to bundle alongside your main excecutable.",
    size: "normal",
    icon: Wrench,
  },
];

export type App = {
  name: string;
  description: string;
  platforms: string[];
  href: string;
};

export const apps: App[] = [
  {
    name: "Delta Client",
    description:
      "An open-source Minecraft: Java Edition compatible client, written from scratch in Swift.",
    platforms: ["macOS"],
    href: "https://deltaclient.app",
  },
  {
    name: "Video Village",
    description:
      "A plugin manager for filmmakers. The Linux build is SwiftCrossUI, bundled by Swift Bundler.",
    platforms: ["Linux"],
    href: "https://videovillage.com/",
  },
  {
    name: "ModularMTL",
    description:
      "A modular multiplication visualisation built with SwiftUI and Metal.",
    platforms: ["macOS"],
    href: "https://github.com/JezewskiG/ModularMTL",
  },
  {
    name: "Friend",
    description:
      "A technical demo showing how system-based assistants can integrate with LLMs.",
    platforms: ["macOS"],
    href: "https://github.com/JoshuaBrest/Friend",
  },
  {
    name: "AutoDock",
    description:
      "A utility that hides and shows the macOS Dock based on display size.",
    platforms: ["macOS"],
    href: "https://github.com/ghall89/AutoDock",
  },
  {
    name: "Arcmark",
    description:
      "A bookmark manager that attaches to any browser window as a sidebar.",
    platforms: ["macOS"],
    href: "https://github.com/Geek-1001/arcmark",
  },
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Does it work with my existing package?",
    answer:
      "Yes. Swift Bundler projects are just SwiftPM packages with a Bundler.toml config file. Add a Bundler.toml beside Package.swift, point it at an executable product, and run.",
  },
  {
    question: "Does Swift Bundler work with SwiftCrossUI?",
    answer:
      "Yes. Swift Bundler and SwiftCrossUI are designed to work together. The SwiftCrossUI template gives you a native SwiftUI-style UI (with hot reloading), while Swift Bundler handles platform-specific configuration such as URL schemes, permissions, signing and installers. Swift Bundler also works with any other UI library.",
  },
  {
    question: "How do I migrate a v2 config?",
    answer:
      "Swift Bundler still understands v2 configs. Migrate your config file with sbun config migrate to get access to the latest features. The command backs up your config at Bundler.toml.orig.",
  },

  {
    question: "Do I still need Xcode?",
    answer:
      "When targeting Apple platforms you must have Xcode installed to get access to Apple-only frameworks such as SwiftUI, AppKit and UIKit. You do not need to use Xcode as your editor, and you never need an .xcodeproj. If you like Xcode, sbun generate-xcode-support lets you run your apps from Xcode.",
  },
  {
    question: "What does it need installed?",
    answer:
      "A Swift toolchain is required. On Linux you also need patchelf, plus rpmbuild or appimagetool depending on your target formats. On Windows, run from a Visual Studio Developer Command Prompt/PowerShell so that dumpbin is on PATH. Targeting Android requires a Swift Android SDK and an Android NDK.",
  },
  {
    question: "Is it really free?",
    answer:
      "Swift Bundler is Apache 2.0 licensed and maintained by moreSwift. Sponsorship through Open Collective funds maintenance and improved platform support.",
  },
];

export const installCommands = {
  macos: `curl -LO ${artifacts.macos}
sudo installer -pkg swift-bundler-3.0.0-macos-universal.pkg -target /`,
  linuxDeb: `curl -LO ${artifacts.deb}
sudo apt install ./swift-bundler_3.0.0-1_amd64.deb`,
  linuxRpm: `curl -LO ${artifacts.rpm}
sudo dnf install ./swift-bundler-3.0.0-1.x86_64.rpm`,
  windows: `Invoke-WebRequest -Uri "${artifacts.msi}" \`
  -OutFile swift-bundler.msi
Start-Process msiexec.exe -ArgumentList '/i swift-bundler.msi'`,
  source: `git clone ${githubUrl}
cd swift-bundler
SBUN_NO_SCHEMA_GEN=1 swift build
sudo cp .build/release/swift-bundler /usr/local/bin/`,
};

export const platformNames = [
  "macOS",
  "iOS",
  "tvOS",
  "visionOS",
  "Linux",
  "Windows",
  "Android",
];
