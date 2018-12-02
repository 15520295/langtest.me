class PlaylistItem {
    constructor(name, uri, image) {
        this.name = name;
        this.uri = uri;
    }
}

export const PLAYLIST = [
    new PlaylistItem(
        'Doraemon - Mao',
        require('./../../../assets/audio/doraemon.mp3'),
    ),
    new PlaylistItem(
        'Mildred Bailey – “All Of Me”',
        'https://ia800304.us.archive.org/34/items/PaulWhitemanwithMildredBailey/PaulWhitemanwithMildredBailey-AllofMe.mp3',
    ),
    new PlaylistItem(
        'Podington Bear - “Rubber Robot”',
        'https://s3.amazonaws.com/exp-us-standard/audio/playlist-example/Podington_Bear_-_Rubber_Robot.mp3',
    ),
];
