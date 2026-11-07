# ICA 03 requirement checklist

Based on your lecturer's individual React Native project instructions.

| Requirement | Where it is implemented |
|---|---|
| Individual React Native app | Entire Expo project |
| Unique title | **Check and register a title yourself** |
| At least 5 screens | `index.jsx`, `topics.jsx`, `details.jsx`, `quiz.jsx`, `results.jsx` |
| Suitable navigation | Expo Router `Tabs`, `router.push`, and `router.replace` |
| Own locally stored dataset | `data/topics.json`, `data/questions.json` — **customize the sample records** |
| Retrieve and show local data dynamically | Imported JSON used in `TopicCard`, `FlatList`, and quiz questions |
| Search and filtering | `app/topics.jsx` |
| View detailed information | `app/details.jsx` |
| Completely offline | No `fetch`, API, server, login, or online database |
| GitHub repository | **Create your own repository and push your work regularly** |

## Test before submission

- [ ] Home screen opens.
- [ ] All topic cards open the correct details screen.
- [ ] Search for `password` and see matching results.
- [ ] Filter `Device Safety` and see only the matching topics.
- [ ] Remove search text and switch category back to `All`.
- [ ] Read a lesson and open its 3-question quiz.
- [ ] Choose a wrong answer and check that the correct answer is highlighted.
- [ ] Choose a correct answer and check the feedback.
- [ ] Complete the 12-question main quiz and see score / percentage.
- [ ] Retry a quiz and verify it starts at Question 1.
- [ ] Test on phone or browser, and verify that the data and quiz do not call any online API (development mode still needs the Metro server).
- [ ] Personalize the sample datasets and title.
- [ ] Push source code to GitHub; do not push `node_modules`.

## Dates from the lecturer's ICA document

- Project title registration: **4 November 2026** (check with lecturer if missed).
- Project deadline: **15 November 2026**.

## What to explain in your demonstration

1. This is an offline educational app for students to learn basic cyber safety.
2. `topics.json` and `questions.json` are the local datasets.
3. `FlatList` dynamically displays the filtered topics.
4. `useState` stores search text, selected category, selected answer and score.
5. Expo Router navigates between 5 screens.
6. The final result uses `(score / total) * 100` to calculate the percentage.
