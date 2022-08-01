import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchFiltersThunk,
    setActiveFilter,
} from '../../actions';
import { useHttp } from '../../hooks/http.hook'

const HeroesFilters = () => {
    const { request } = useHttp()
    const dispatch = useDispatch()
    const { filters, activeFilter } = useSelector(store => store.filters)

    useEffect(() => {
        dispatch(fetchFiltersThunk(request))
    }, [])

    function getFilters() {
        return filters.map(({ filter, lable, classNames }) => {
            if (filter === activeFilter) {
                classNames += ' active'
            }

            return <input
                onClick={onSetActiveFilter}
                type="button"
                name={filter}
                key={filter}
                value={lable}
                className={classNames}
            />
        })
    }

    function onSetActiveFilter(event) {
        event.target.name ?
            dispatch(setActiveFilter(event.target.name))
            : dispatch(setActiveFilter(null))
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    <button
                        onClick={onSetActiveFilter}
                        className={!activeFilter ?
                            "btn btn-outline-dark active"
                            : "btn btn-outline-dark"}>
                        Все
                    </button>
                    {getFilters(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;