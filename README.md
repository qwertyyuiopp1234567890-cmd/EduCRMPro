# EduCRM Pro – Android (WebView)

Native Android Studio project (Kotlin) wrapping a static HTML/CSS/JS web app via WebView.
The web app uses `localStorage` as its database (seeded with sample data on first run).

## Project layout

```
EduCRMPro/
├── build.gradle                 # root project
├── settings.gradle
├── gradle.properties
├── gradle/wrapper/gradle-wrapper.properties
└── app/
    ├── build.gradle             # app module
    ├── proguard-rules.pro
    └── src/main/
        ├── AndroidManifest.xml
        ├── java/com/educrm/app/
        │   ├── SplashActivity.kt
        │   └── MainActivity.kt
        ├── res/
        │   ├── layout/{activity_splash,activity_main}.xml
        │   ├── values/{strings,colors,themes}.xml
        │   ├── drawable/{splash_logo,ic_launcher_foreground,ic_launcher_background}.xml
        │   ├── mipmap-anydpi-v26/{ic_launcher,ic_launcher_round}.xml
        │   └── xml/network_security_config.xml
        └── assets/
            ├── index.html        # login screen
            ├── dashboard.html
            ├── students.html
            ├── teachers.html
            ├── courses.html
            ├── groups.html
            ├── attendance.html
            ├── payments.html
            ├── schedule.html
            ├── css/style.css
            └── js/{app.js, auth.js, data.js}
```

## How to build the APK

1. **Open in Android Studio** (Hedgehog or newer)
   - File → Open → select the `EduCRMPro/` folder
   - Wait for Gradle sync to complete (it will download Gradle 8.7 and Android Gradle Plugin 8.5.2 + dependencies on first run)
   - If prompted, accept the Android SDK license and let Studio install Android SDK 34

2. **Generate the Gradle wrapper jar** (if missing)
   - Studio normally creates it automatically on first sync.
   - If you need to do it manually from a terminal in the project root:
     `gradle wrapper --gradle-version 8.7`

3. **Build the APK**
   - **Build → Build Bundle(s) / APK(s) → Build APK(s)**
   - The debug APK is written to `app/build/outputs/apk/debug/app-debug.apk`
   - For a release-signed APK: **Build → Generate Signed Bundle / APK → APK**

4. **Run on a device or emulator**
   - Click the green ▶ Run button (a debug APK is installed and launched)

## Default login

```
Email:    admin@educrm.app
Password: admin123
```

The app seeds sample students, teachers, courses, groups, attendance and payments on first launch.
All data is stored in WebView `localStorage` (DOM Storage is enabled in `MainActivity.kt`).

## Configuration

- **Package name:** `com.educrm.app` (set in `app/build.gradle` → `applicationId` and `namespace`)
- **App name:** EduCRM Pro (`app/src/main/res/values/strings.xml`)
- **Min SDK:** 21 / **Target SDK:** 34
- **Language:** Kotlin
- **WebView features enabled:** JavaScript, DOM storage, file access, database, viewport, hardware acceleration
- **Pull-to-refresh:** `SwipeRefreshLayout` reloads the current page
- **Back button:** navigates back inside WebView while history exists
- **Error view:** shown on main-frame load failures with a Retry button
- **Splash screen:** simple branded splash via `SplashActivity` (1.2s)

## Replacing the launcher icon

The launcher icon is a vector adaptive icon under `res/mipmap-anydpi-v26/` and `res/drawable/`.
To use your own PNG icons, right-click `res/` in Android Studio → New → Image Asset.
