# CyberSafe — Cybersecurity Awareness & Quiz App

A small, beginner-friendly **offline** React Native application made with **Expo Router**.

## Main features

- **5 screens:** Home, Topics, Topic Details, Quiz, Quiz Results.
- **Search:** Find learning topics using a search bar.
- **Filter:** Choose Online Safety, Account Safety, Device Safety, or Privacy.
- **Local dataset:** 8 cybersecurity topics and 24 sample quiz questions in JSON files.
- **Dynamic display:** Topic cards and quiz questions are shown by reading JSON data.
- **Quiz scoring:** Pick 1 of 4 answers, get feedback, track progress, see your final score.
- **Practice quizzes:** 3 questions for each topic and a mixed 12-question quiz.
- **Offline learning functionality:** No account, backend, public API or online database. During development, Expo still needs the local Metro bundler to load the app.
- **Web support:** Web dependencies are already included.

## Why the code is student-friendly

This project follows the techniques in the Day 12 and Day 13 class examples:

- `app/*.jsx` files for separate Expo Router screens.
- `Tabs` in `app/_layout.jsx` for navigation.
- `View`, `Text`, `Pressable`, `ScrollView`, `TextInput`, `FlatList`.
- `useState` for simple interactive features.
- `StyleSheet.create()` for styling.
- `Ionicons` for icons.
- A single reusable `TopicCard` component to avoid repeated card code.

There is no Redux, backend, complex database, API, custom animation, or login system.

## Files explained

```text
CyberSafe_Quiz_App/
  app/
    _layout.jsx       Tabs and navigation
    index.jsx         Home
    topics.jsx        Searchable/filterable topic list
    details.jsx       One topic's detailed information
    quiz.jsx          Multiple choice quiz and score calculation
    results.jsx       Score summary / retry
  components/
    TopicCard.jsx     Reusable topic card
  constants/
    Colors.js         Colours for all screens
  data/
    topics.json       Learning topics: editable local data
    questions.json    Questions: editable local data
  assets/             App icon, favicon, splash
  scripts/
    check-data.js     Local dataset validation
  app.json            Expo configuration
  package.json        Dependencies and commands
  START_HERE.md       Step-by-step setup
  ICA03_CHECKLIST.md  Requirements and testing
```

## Run locally

```bash
npm install
npx expo start
```

Press **W** for web or use Expo Go on a compatible Android phone.

## Modify your dataset

To add a topic, open `data/topics.json`. Add an object with a new unique `id`, title, category, icon, colour, description and learning points.

To add a question, open `data/questions.json`. Use an existing `topicId`, create four answer `options`, and set `answer` to the **index** of the correct option:

- `0` means first option (A)
- `1` means second option (B)
- `2` means third option (C)
- `3` means fourth option (D)

For each new topic, include at least 3 questions if you want the topic practice quiz to have 3 questions.

Check your data:

```bash
npm run check-data
```

This source project is intentionally simple so you can understand, edit, explain and demonstrate it. Do not claim that any unmodified sample content was personally created by you; customize the data for your ICA.
