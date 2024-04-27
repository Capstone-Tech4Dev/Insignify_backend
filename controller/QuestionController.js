const Question = require('../Model/QueModel');
const ResponseModel = require('../Model/ResponseModel'); 
const psychometricQuestions = require('../Questions.json');
const fs = require('fs');
// console.log(psychometricQuestions);

async function fetchAndSaveQuestions(req, res) {
    try {
        const questions = psychometricQuestions;
       console.log(questions);

        for (const q of questions) {
            const newQuestion = new Question({
                section: q.section,
                question: q.question,
                correctAnswer: q.correctAnswer,
                options: q.options
            });
            await newQuestion.save();
        }
        res.status(200).json({
            message: 'Questions saved to database'
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function getAllQuestions(req, res) {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

async function getQuestionById(req, res) {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({
                message: 'Question not found'
            });
        }
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

async function updateQuestion(req, res) {
    try {
        const question = await Question.findById(req.params.id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        question.question = req.body.question || question.question;
        question.correctAnswer = req.body.correctAnswer || question.correctAnswer;
        question.options = req.body.options || question.options;
        await question.save();
        res.json(question);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

async function deleteQuestion(req, res) {
    try {
        const { id } = req.params;
        const question = await Question.findByIdAndDelete(id);
        if (!question) {
            return res.status(404).json({ message: 'Question not found' });
        }
        res.json({ message: 'Question deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}



// POST route for submitting responses
async function submitResponses(req, res) {
  try {
    const responses = req.body.responses;
    // Save the responses to the database
    await ResponseModel.create(responses);
    // Respond with a success message
    res.status(200).json({ message: 'Test responses submitted successfully' });
  } catch (error) {
    console.error('Error submitting responses:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}




module.exports = {
    fetchAndSaveQuestions,
    getAllQuestions,
    getQuestionById,
    updateQuestion,
    deleteQuestion,
    submitResponses
};
