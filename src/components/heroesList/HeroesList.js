import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    deleteHero,
    setIdUpdateHero
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { heroes, heroesLoadingStatus, updateHeroId } = useSelector(state => state.heroes);
    const { activeFilter } = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(heroesFetching());
        request("http://localhost:3001/heroes")
            .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError()))

        dispatch(filtersFetching())
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterHeroList = heroesList => {
        return heroesList.filter(({ element }) => !activeFilter || element === activeFilter)
    }

    const renderHeroesList = filteredHeroes => {
        if (!filteredHeroes.length) return null
        return filteredHeroes.map(({ id, element, ...props }) => {
            return (
                <CSSTransition
                    key={id}
                    timeout={300}
                    classNames="hero"
                >
                    <HeroesListItem
                        key={id}
                        id={id}
                        element={element}
                        {...props}
                        onDeleteHero={onDeleteHero}
                        onSetIdUpdateHero={onSetIdUpdateHero}
                        updateHeroId={updateHeroId}
                    />
                </CSSTransition>
            )
        })
    }

    const renderNoHeroe = filteredHeroes => {
        return !filteredHeroes.length ?
            <h5 className="text-center mt-5">Героев пока нет</h5>
            : null
    }

    const onDeleteHero = heroId => {
        request(`http://localhost:3001/heroes/${heroId}`, "DELETE")
            .then(() => dispatch(deleteHero(heroId)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    const onSetIdUpdateHero = heroId => dispatch(setIdUpdateHero(heroId))

    return (
        < ul >
            {renderNoHeroe(filterHeroList(heroes))}
            <TransitionGroup>
                {renderHeroesList(filterHeroList(heroes))}
            </TransitionGroup>
        </ul >
    )
}

export default HeroesList;