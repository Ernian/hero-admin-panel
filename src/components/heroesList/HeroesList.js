import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    deleteHero,
} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { heroes, heroesLoadingStatus } = useSelector(state => state.heroes);
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

    const renderHeroesList = (fileredHeroes) => {
        if (fileredHeroes.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }
        return fileredHeroes.map(({ id, element, ...props }) => {
            return <HeroesListItem
                key={id}
                id={id}
                element={element}
                {...props}
                onDeleteHero={onDeleteHero}
            />
        })
    }

    const onDeleteHero = heroId => {
        request(`http://localhost:3001/heroes/${heroId}`, "DELETE")
            .then(() => dispatch(deleteHero(heroId)))
            .catch(() => dispatch(heroesFetchingError()))
    }

    return (
        <ul>
            {renderHeroesList(filterHeroList(heroes))}
        </ul>
    )
}

export default HeroesList;