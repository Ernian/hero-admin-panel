import { useHttp } from '../../hooks/http.hook';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CSSTransition, TransitionGroup, } from 'react-transition-group';
import { fetchHeroesThunk, deleteHeroThunk, } from '../../actions';
import { setIdUpdateHero } from './heroesSlice'
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

const HeroesList = () => {
    const { heroes, heroesLoadingStatus, updateHeroId } = useSelector(state => state.heroes);
    const { activeFilter } = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroesThunk(request))
    }, []);

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filterHeroList = heroes => {
        return heroes.filter(({ element }) => !activeFilter || element === activeFilter)
    }

    const onDeleteHero = heroId => dispatch(deleteHeroThunk(request, heroId))
    const onSetIdUpdateHero = heroId => dispatch(setIdUpdateHero(heroId))

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

    const renderNoHeroes = filteredHeroes => {
        return !filteredHeroes.length ?
            <h5 className="text-center mt-5">Героев пока нет</h5>
            : null
    }

    return (
        < ul >
            {renderNoHeroes(filterHeroList(heroes))}
            <TransitionGroup>
                {renderHeroesList(filterHeroList(heroes))}
            </TransitionGroup>
        </ul >
    )
}

export default HeroesList;