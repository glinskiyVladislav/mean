module.exports.about = (req, res) => {
    res.render('generic-text', {
        title: 'About',
        content: 'Loc8r был создан чтобы помочь людям найти место где можно приятно провести время\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit Nunc sed lorem ac nisi dignissim accumsan.'
    });
};