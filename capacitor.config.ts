import {CapacitorConfig} from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "sg.edu.ntu.sc2006.scsg.group2.pineapple.studios",
  appName: "PineappleStudios",
  webDir: "dist",
  server: {
    androidScheme: "http",
  },
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation:
        "Library/Application Support/PineappleStudio/database",
      iosIsEncryption: false,
      iosKeychainPrefix: "pineapple-studio",
      iosBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for Pineapple Studio databse.",
      },
      androidIsEncryption: false,
      androidBiometric: {
        biometricAuth: false,
        biometricTitle: "Biometric login for Pineapple Studio databse.",
        biometricSubTitle: "Log in using your biometric",
      },
      electronIsEncryption: true,
      electronWindowsLocation: "%appdata%/Local/PineappleStudio/database",
      electronMacLocation:
        "~/Library/Application Support/PineappleStudio/database",
      electronLinuxLocation: "~/.local/share/PineappleStudio/databse",
    },
  },
};

export default config;
