
const HeroesListItem = ({
    id,
    name,
    description,
    element,
    onDeleteHero,
    onSetIdUpdateHero,
    updateHeroId
}) => {

    let elementClassName;

    switch (element) {
        case 'fire':
            elementClassName = 'bg-danger bg-gradient';
            break;
        case 'water':
            elementClassName = 'bg-primary bg-gradient';
            break;
        case 'wind':
            elementClassName = 'bg-success bg-gradient';
            break;
        case 'earth':
            elementClassName = 'bg-secondary bg-gradient';
            break;
        default:
            elementClassName = 'bg-warning bg-gradient';
    }

    const classes = id === updateHeroId ?
        `card flex-row mb-4 shadow-lg text-white update-hero ${elementClassName}`
        : `card flex-row mb-4 shadow-lg text-white ${elementClassName}`

    return (
        <li className={classes}>
            <img src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ 'objectFit': 'cover' }} />
            <div className="card-body">

                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
                <button
                    type="button"
                    className="btn btn-warning"
                    aria-label="Update"
                    onClick={() => onSetIdUpdateHero(id)}
                >Изменить данные</button>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button
                    type="button"
                    className="btn-close btn-close"
                    aria-label="Close"
                    onClick={() => onDeleteHero(id)}
                ></button>
            </span>
        </li>
    )
}

export default HeroesListItem;