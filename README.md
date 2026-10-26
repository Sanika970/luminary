
Career Explorer
A small career exploration tool for students in Classes 9–12. The idea is to help students discover careers that match their interests and understand how their choice of stream can affect their options.
What it does

1. Asks for the student's grade. Students in Classes 11–12 also select their stream: PCM, PCB, Commerce, or Humanities.

2. Asks 12 questions, with two questions for each RIASEC interest type. Answers range from 😖 to 🤩.
3. Adds the two answers for each type to get a score between 2 and 10, then picks the top two types.
4. Recommends five careers for each of the top two types.
   - Classes 9–10: Shows all 10 recommendations and explains which streams keep each career open.
   - Classes 11–12: Shows careers that match the student's current stream.
5. Includes a "What if you wanted something different?" section where students can explore other interests without changing their original results.
Design and implementation
Questions
The quiz has two versions of each question: one for Classes 9–10 and another for Classes 11–12. The younger version uses familiar school life situations, while the older version focuses more on projects and practical work.

Scoring
Each RIASEC type gets the sum of its two answers, giving a score between 2 and 10.

The top two types are selected using three rules, in order:
1. Higher total score comes first.
2. If totals are equal, the type with the higher individual answer comes first.
3. If they're still tied, a fixed order is used: R, I, A, S, E, C.
This keeps the results predictable: the same answers always produce the same ranking.

Since there are only two questions per type, ties are possible. The ranking makes the result consistent, but it doesn't mean the test can accurately measure a student's interests.
Streams and careers
The prototype contains 42 careers, with seven mapped to each RIASEC type. I selected the careers with Indian students in mind and assigned their interest types manually.

Each career has a stream requirement, such as "any stream", "needs PCM", "needs PCB", or "needs Commerce". Every type has at least five careers marked as open to students from any stream, so students aren't left with too few recommendations.

These tags are my initial choices, not verified admission rules. They would need to be checked against the actual subject and eligibility requirements for each course.
The "Why this fits you" lines
Each career has two short explanations: one for Classes 9–10 and another for Classes 11–12.
The aim was to explain the connection in simple language without making exaggerated claims or promising salaries or admissions.

The lines are stored in why lines.js and selected based on the student's grade. They're written in advance rather than generated for each student, which avoids API costs and keeps the results consistent. If a line is missing, the app uses the older handnwritten version.

Mobile experience
I designed the interface for phones first.
- Large answer buttons let students answer with a single tap.
- Students can go back and change an answer.
- students cannot go to next ques without answering; there's no next button
- Results appear as a vertical trail, with a glowing line connecting the recommended careers.
- Tapping a career opens a bottom sheet with its explanation.
- Separate tabs keep stream information and the "What if?" section from making the results page too crowded.
- Animations and small vibration feedback make interactions feel more responsive, with support for reduced motion.
- Results can be shared through the phone's native share options where supported.

Sharing results
Answers are stored in the URL hash. This means students can reload or share a results link without needing an account.

The prototype doesn't store answers in a database or send them to a server.
Trade offs:
A few decisions were made to keep the prototype manageable:
- 12 questions: The quiz is quick to complete, but two questions per type aren't enough for a reliable assessment. Small changes in answers can affect the ranking (percentage weitage of one answer is higher)
- 42 careers: This is enough to demonstrate the idea, but it's only a starting list. A larger, reviewed dataset would be needed for real use.
- Fixed explanations: Writing the explanations in advance avoids live API calls and makes them easier to review, though they can't be personalised to each student's answers.
