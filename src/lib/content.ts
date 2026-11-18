export const githubUrl = 'https://github.com/moreSwift/swift-bundler';
export const docsUrl = 'https://swiftbundler.dev/documentation/swift-bundler';
export const discordUrl = 'https://moreswift.dev/discord';
export const openCollectiveUrl = 'https://opencollective.com/moreswift';

export const release = {
	version: '3.0.0',
	tag: 'v3.0.0',
	date: 'November 2026',
	downloadBase: `${githubUrl}/releases/download/v3.0.0`
};

export const artifacts = {
	macos: `${release.downloadBase}/swift-bundler-3.0.0-macos-universal.pkg`,
	deb: `${release.downloadBase}/swift-bundler_3.0.0-1_amd64.deb`,
	rpm: `${release.downloadBase}/swift-bundler-3.0.0-1.x86_64.rpm`,
	msi: `${release.downloadBase}/swift-bundler-3.0.0-windows-x86_64.msi`,
	zip: `${release.downloadBase}/swift-bundler-3.0.0-windows-x86_64.zip`,
	tarball: `${release.downloadBase}/swift-bundler-3.0.0-linux-x86_64.tar.gz`
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
	note: string;
};

const baseConfig = (icon: string, extra: SnippetLine[] = []): SnippetLine[] => [
	{ text: 'config_version = "3.1.0"' },
	{ text: '' },
	{ text: '[apps.HelloWorld]' },
	{ text: 'identifier = "dev.example.HelloWorld"' },
	{ text: 'product = "HelloWorld"' },
	{ text: 'version = "1.0.0"' },
	{ text: `icon = "${icon}"` },
	{ text: '' },
	...extra
];

const accent = (text: string): SnippetLine => ({ text, accent: true });
const plain = (text: string): SnippetLine => ({ text });

export const bundlers: Bundler[] = [
	{
		id: 'darwinApp',
		name: 'darwinApp',
		label: '.app',
		pickerPlatforms: 'Apple platforms',
		platforms: 'macOS · iOS · tvOS · visionOS · Mac Catalyst',
		blurb:
			'Builds .app bundles for every Apple platform, with universal macOS binaries and automatic provisioning.',
		command: 'sbun bundle -p macOS --universal',
		output: 'HelloWorld.app',
		signing: 'Developer ID, provisioning profiles, ad-hoc fallback',
		handles: [
			'Info.plist, entitlements and asset catalogs',
			'Icon Composer .icon files and Metal shaders',
			'Automatic provisioning and device registration',
			'Xcode builds without an .xcodeproj'
		],
		formats: ['.app', '.dylib', '.icon'],
		snippet: baseConfig('icon.png', [
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(macOS)"'),
			accent('icon = "AppIcon.icon"'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(macCatalyst)"'),
			accent('interface_idiom = "mac"'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(darwinApp)"'),
			accent('plist.NSHighResolutionCapable = true')
		]),
		note: 'One manifest covers every Apple platform. The Darwin bundler handles the platform differences.'
	},
	{
		id: 'linuxGeneric',
		name: 'linuxGeneric',
		label: 'Portable',
		pickerPlatforms: 'Linux',
		platforms: 'Linux',
		blurb:
			'Creates a portable Linux directory containing the executable, its shared libraries and resources.',
		command: 'sbun bundle --bundler linuxGeneric',
		output: 'HelloWorld/',
		signing: 'Not supported (yet)',
		handles: [
			'Dynamic libraries copied beside the executable',
			'Resources and custom URL schemes',
			'Debug info extracted with --strip',
			'Portable output for custom packaging'
		],
		formats: ['directory'],
		snippet: baseConfig('icon.png', [
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(linux)"'),
			accent('dbus_activatable = true'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(linuxGeneric)"'),
			accent('url_schemes = ["hello"]')
		]),
		note: 'The generic Linux bundler is aimed at development and custom packaging workflows.'
	},
	{
		id: 'linuxAppImage',
		name: 'linuxAppImage',
		label: '.AppImage',
		pickerPlatforms: 'Linux',
		platforms: 'Linux',
		blurb:
			'Packs the app into one self-contained AppImage, patching runpaths and bundling dynamic libraries.',
		command: 'sbun bundle --bundler linuxAppImage --strip',
		output: 'HelloWorld.AppImage',
		signing: 'Not supported (yet)',
		handles: [
			'Dynamic libraries with patched runpaths',
			'.desktop files, icons and relative symlinks',
			'AppImage metadata and D-Bus activation',
			'A double-clickable single-file distribution'
		],
		formats: ['.AppImage'],
		snippet: baseConfig('icon.png', [
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(linux)"'),
			accent('dbus_activatable = true'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(linuxAppImage)"'),
			accent('icon = "AppIcon.png"')
		]),
		note: 'The AppImage bundler patches runpaths and travels with the libraries it needs.'
	},
	{
		id: 'linuxRPM',
		name: 'linuxRPM',
		label: '.rpm',
		pickerPlatforms: 'Linux',
		platforms: 'Linux',
		blurb:
			'Produces an RPM with dependency, licence and description metadata ready for package repositories.',
		command: 'sbun bundle --bundler linuxRPM',
		output: 'HelloWorld-1.0.0-1.x86_64.rpm',
		signing: 'Not supported (yet)',
		handles: [
			'External RPM dependencies and requirements',
			'Licence and description metadata',
			'.desktop files, icons and URL schemes',
			'Paths-with-spaces workaround'
		],
		formats: ['.rpm'],
		snippet: baseConfig('icon.png', [
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(linux)"'),
			accent('dbus_activatable = true'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(linuxRPM)"'),
			accent('requirements = ["gtk3"]')
		]),
		note: 'RPM packaging gives you native dependency metadata for Fedora and RHEL-family systems.'
	},
	{
		id: 'windowsGeneric',
		name: 'windowsGeneric',
		label: '.zip',
		pickerPlatforms: 'Windows',
		platforms: 'Windows',
		blurb:
			'Creates a portable Windows directory with the executable, runtime DLLs and resources.',
		command: 'sbun bundle --bundler windowsGeneric',
		output: 'HelloWorld/',
		signing: 'Executable and DLL signing supported',
		handles: [
			'DLL discovery and resource bundling',
			'GUI-subsystem linking',
			'App icon and application manifest',
			'Portable layout for zip distribution'
		],
		formats: ['directory', '.zip'],
		snippet: baseConfig('icon.ico', [
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(windows)"'),
			accent('icon = "icon.ico"'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(windowsGeneric)"'),
			accent('url_schemes = ["hello"]')
		]),
		note: 'The generic Windows bundler produces a portable folder with the runtime DLLs beside the app.'
	},
	{
		id: 'windowsMSI',
		name: 'windowsMSI',
		label: '.msi',
		pickerPlatforms: 'Windows',
		platforms: 'Windows',
		blurb:
			'Creates a WiX-based MSI installer for Program Files, with a stable upgrade code and custom action support.',
		command: 'sbun bundle --bundler windowsMSI -c release',
		output: 'HelloWorld-1.0.0-x86_64.msi',
		signing: 'Certificate or Azure Artifact Signing',
		handles: [
			'WiX install, including extensions',
			'64-bit Program Files installs',
			'Custom WXS actions and app manifests',
			'PDBs excluded from release installers'
		],
		formats: ['.msi'],
		snippet: baseConfig('icon.ico', [
			accent('[apps.HelloWorld.msi]'),
			accent('wix_extensions = ['),
			accent('  "WixToolset.Util.wixext/6.0.0",'),
			accent(']'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "platform(windows)"'),
			accent('icon = "icon.ico"'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(windowsMSI)"'),
			accent('upgrade_code = "YOUR-UPGRADE-CODE"')
		]),
		note: 'The MSI bundler installs WiX when needed and signs the executable and bundled DLLs.'
	},
	{
		id: 'androidAPK',
		name: 'androidAPK',
		label: '.apk',
		pickerPlatforms: 'Android',
		platforms: 'Android',
		blurb:
			'Builds and signs an APK, then installs and launches it on a connected device or emulator.',
		command: 'sbun run -p android --device "Pixel 8a"',
		output: 'HelloWorld.apk',
		signing: 'Not supported (yet)',
		handles: [
			'APK install and launch over adb',
			'Swift SDK, NDK and AAPT discovery',
			'Permissions and Android resources',
			'Java and Kotlin sources from libraries'
		],
		formats: ['.apk'],
		snippet: baseConfig('icon.png', [
			accent('[apps.HelloWorld.android]'),
			accent('min_sdk = 28'),
			accent('target_sdk = 35'),
			accent('permissions = ["INTERNET", "CAMERA"]'),
			plain(''),
			accent('[[apps.HelloWorld.overlays]]'),
			accent('condition = "bundler(androidAPK)"'),
			accent('description = "HelloWorld for Android"')
		]),
		note: 'Build, install and launch from one command. Emulator management is built in.'
	}
];

export type Feature = {
	title: string;
	body: string;
	meta: string;
	size: 'wide' | 'normal';
};

export const features: Feature[] = [
	{
		title: 'Change code. Keep state.',
		body: 'Run with --hot and Swift Bundler swaps your app’s code over a local TCP connection. No relaunch, no navigating back to the screen you were testing.',
		meta: 'macOS and Linux',
		size: 'wide'
	},
	{
		title: 'One config, platform overlays',
		body: 'Set the defaults once, then add platform- or bundler-specific overrides under [[apps.App.overlays]]. Validated, merged recursively, and described by the generated JSON schema.',
		meta: 'Bundler.toml · config_version = "3.1.0"',
		size: 'wide'
	},
	{
		title: 'Signing, handled',
		body: 'Automatic provisioning profiles, certificate matching, device registration, ad-hoc fallback, and Azure Artifact Signing on Windows.',
		meta: 'Apple + Windows',
		size: 'normal'
	},
	{
		title: 'Know your devices',
		body: 'List and manage Apple simulators and Android emulators with one set of commands. Xcode 27 Device Hub supported.',
		meta: 'sbun devices list',
		size: 'normal'
	},
	{
		title: 'Bring your own builders',
		body: 'Pull CMake or prebuilt projects into a SwiftPM build. Add helper executables, like an updater, beside your app.',
		meta: 'Projects API',
		size: 'normal'
	},
	{
		title: 'Errors that explain themselves',
		body: 'Cargo-style error chains, actionable hints and typed throws. When a build fails, the tool tells you what to do next.',
		meta: 'RichError',
		size: 'normal'
	}
];

export type App = {
	name: string;
	description: string;
	platforms: string[];
	href: string;
};

export const apps: App[] = [
	{
		name: 'Delta Client',
		description:
			'An open-source Minecraft: Java Edition compatible client, written from scratch in Swift.',
		platforms: ['macOS'],
		href: 'https://deltaclient.app'
	},
	{
		name: 'Video Village',
		description:
			'A plugin manager for filmmakers. The Linux build is SwiftCrossUI, bundled with Swift Bundler.',
		platforms: ['Linux'],
		href: 'https://videovillage.com/'
	},
	{
		name: 'ModularMTL',
		description: 'A modular multiplication visualisation built with SwiftUI and Metal.',
		platforms: ['macOS'],
		href: 'https://github.com/JezewskiG/ModularMTL'
	},
	{
		name: 'Friend',
		description:
			'A technical demo showing how system-based assistants can integrate with LLMs.',
		platforms: ['macOS'],
		href: 'https://github.com/JoshuaBrest/Friend'
	},
	{
		name: 'AutoDock',
		description: 'A utility that hides and shows the macOS Dock based on display size.',
		platforms: ['macOS'],
		href: 'https://github.com/ghall89/AutoDock'
	},
	{
		name: 'Arcmark',
		description: 'A bookmark manager that attaches to any browser window as a sidebar.',
		platforms: ['macOS'],
		href: 'https://github.com/Geek-1001/arcmark'
	}
];

export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
	{
		question: 'Do I still need Xcode?',
		answer:
			'You need Apple’s command line tools to build Swift. For non-macOS Apple platforms Swift Bundler uses xcodebuild where SwiftPM can’t, so a full Xcode install is required there. You do not need Xcode to edit, and you never need an .xcodeproj. If you like Xcode, sbun generate-xcode-support lets you run the package from it.'
	},
	{
		question: 'Does it work with my existing package?',
		answer:
			'Yes. Swift Package Manager stays the source of truth. Add a Bundler.toml beside Package.swift, point it at an executable product, and run. Swift Bundler reads the package graph itself, including traits and conditional dependencies.'
	},
	{
		question: 'How do I migrate a v2 config?',
		answer:
			'v2 configs are still read. Swift Bundler warns and can rewrite them with the new format, keeping a .orig backup. Run sbun config migrate. The main changes are identifier, plist, deployment targets from Package.swift, and $(VAR) substitutions.'
	},
	{
		question: 'What does it need installed?',
		answer:
			'A Swift 6 toolchain is required. On Linux you also need patchelf, plus rpmbuild or appimagetool for those formats. On Windows, run from a Developer PowerShell for Visual Studio so dumpbin is on PATH; WiX is installed automatically. Android needs a Swift SDK and the NDK.'
	},
	{
		question: 'Is it really free?',
		answer:
			'Swift Bundler is Apache 2.0 licensed and maintained by moreSwift. Sponsorships through Open Collective fund maintenance and new platform support. The source, issue tracker and roadmap are all public on GitHub.'
	}
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
SBUN_NO_SCHEMA_GEN=1 swift build -c release
sudo cp .build/release/swift-bundler /usr/local/bin/`
};

export const platformNames = [
	'macOS',
	'iOS',
	'tvOS',
	'visionOS',
	'Linux',
	'Windows',
	'Android'
];
