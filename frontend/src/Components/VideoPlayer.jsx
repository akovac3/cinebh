const VideoPlayer = ({ className, width, height, video }) => {
    return (
        <iframe className={ className } width={ width } height={ height } src={ video } />
    )
};

export default VideoPlayer;
