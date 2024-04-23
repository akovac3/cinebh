const Image = ({ className, src, width, height }) => {
    return (
        <img src={ src } className={ className } width={ width } height={ height } />
    )
}

export default Image;
