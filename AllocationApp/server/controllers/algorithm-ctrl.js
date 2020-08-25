startAlgorithm = (req, res) => {
    return res.status(201).json({
        success: true,
        message: 'Algorithm started',
    })
}

module.exports = {
    startAlgorithm,
}