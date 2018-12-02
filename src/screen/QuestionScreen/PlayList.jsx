class PlaylistItem {
    constructor(name, uri, image) {
        this.name = name;
        this.uri = uri;
        this.image = image;
    }
}

export const PLAYLIST = [
    new PlaylistItem(
        'Doraemon - Mao',
        require('./../../../assets/audio/doraemon.mp3'),
        require('./../../../assets/images/joychou.jpg')
    ),
    new PlaylistItem(
        'Mildred Bailey – “All Of Me”',
        'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
        'https://facebook.github.io/react/img/logo_og.png'
    ),
    new PlaylistItem(
        'Podington Bear - “Rubber Robot”',
        'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
        'https://facebook.github.io/react/img/logo_og.png'
    ),
];
