// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    heroesFetchingError,
    createHero,
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    parseHeroes
} from '../../actions';
import { useHttp } from '../../hooks/http.hook'
import { v4 as uuidv4 } from 'uuid'


const HeroesAddForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const { request } = useHttp()
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)

    useEffect(() => {
        dispatch(filtersFetching())
        request('http://localhost:3001/filters')
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
        // eslint-disable-next-line
    }, [])

    function onChangeName(event) {
        setName(event.target.value)
    }

    function onChangeDescription(event) {
        setDescription(event.target.value)
    }

    function onChangeElement(event) {
        setElement(event.target.value)
    }

    function clearForm() {
        setName('')
        setDescription('')
        setElement('')
    }

    function onCreateHero(event) {
        event.preventDefault()
        if (!(name && description && element)) return
        const hero = JSON.stringify({
            id: uuidv4(),
            name,
            description,
            element
        })
        request('http://localhost:3001/heroes', 'POST', hero)
            .then(() => dispatch(createHero(hero)))
            .then(() => dispatch(parseHeroes()))
            .then(() => clearForm())
            .catch(() => dispatch(heroesFetchingError()))
    }

    function getOptions() {
        return filters.map(({ filter, lable }) => {
            return <option value={filter} key={filter}>{lable}</option>
        })
    }

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="Как меня зовут?"
                    value={name}
                    onChange={onChangeName}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="Что я умею?"
                    style={{ "height": '130px' }}
                    value={description}
                    onChange={onChangeDescription}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={element}
                    onChange={onChangeElement}
                >
                    <option disabled value="">Я владею элементом...</option>
                    {getOptions()}
                </select>
            </div>

            <button
                type="submit"
                className="btn btn-primary"
                disabled={!(name && description && element)}
                onClick={onCreateHero}
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;