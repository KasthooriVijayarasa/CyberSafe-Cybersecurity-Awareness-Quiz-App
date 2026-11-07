// Run: npm run check-data
// This checks the local JSON data used by the app.
const topics = require('../data/topics.json');
const questions = require('../data/questions.json');
const topicIds = new Set(topics.map((item) => item.id));
const questionIds = new Set(questions.map((item) => item.id));

function check(condition, message) {
  if (!condition) throw new Error(message);
}

check(topics.length >= 8, 'Add at least 8 topics.');
check(topicIds.size === topics.length, 'Every topic needs a unique id.');
check(questionIds.size === questions.length, 'Every question needs a unique id.');
check(questions.length >= 20, 'Add at least 20 quiz questions.');

for (const topic of topics) {
  check(topic.title && topic.short && topic.description, `Missing text for ${topic.id}`);
  check(topic.category && topic.icon, `Missing category or icon for ${topic.id}`);
  check(Array.isArray(topic.tips) && topic.tips.length > 0, `Missing tips in ${topic.id}`);
  check(Array.isArray(topic.warningSigns) && topic.warningSigns.length > 0, `Missing warning signs in ${topic.id}`);
}
for (const question of questions) {
  check(topicIds.has(question.topicId), `Unknown topic for ${question.id}`);
  check(question.question && question.explanation, `Missing question/explanation in ${question.id}`);
  check(Array.isArray(question.options) && question.options.length === 4, `Exactly 4 options needed in ${question.id}`);
  check(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, `Answer must be 0 to 3 in ${question.id}`);
}
for (const topic of topics) {
  check(questions.filter((q) => q.topicId === topic.id).length >= 3, `At least 3 questions needed for ${topic.id}`);
}

console.log(`Data passed: ${topics.length} topics, ${questions.length} questions, ${new Set(topics.map(t => t.category)).size} categories.`);
console.log('Main quiz count:', questions.filter((_, index) => index % 2 === 0).length);
