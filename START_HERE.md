# CyberSafe – Corrected Expo Router Project

## Start
1. Extract this ZIP into a new folder.
2. Open that folder in VS Code.
3. In the terminal run `npm install`.
4. Run `npx expo start -c`.
5. Scan the NEW QR code with Expo Go. If an old Expo session remains open, close it first.

## Fixed navigation
- `app/_layout.jsx` is the root Stack layout.
- `app/(tabs)/_layout.jsx` is the Home / Topics / Quiz tab layout.
- `app/details.jsx` and `app/results.jsx` are Stack screens.
- Relative imports in moved files now use `../../`.
- Topic navigation passes the ID as a string and details handles IDs safely.

## Testing
Open Topics > tap Phishing Awareness > read the lesson > Practice this topic > finish quiz > Results > Explore learning topics.
Also test Home and the main Quiz tab.

All lessons and quiz questions use bundled JSON files; no internet API is needed. The app has not been run on a physical phone in this environment.
