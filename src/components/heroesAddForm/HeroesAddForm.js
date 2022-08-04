import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createHero, updateHero, setIdUpdateHero } from '../heroesList/heroesSlice'
import { v4 as uuidv4 } from 'uuid'

const HeroesAddForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [element, setElement] = useState('')
    const [selectedHero, setSelectedHero] = useState({})
    const dispatch = useDispatch()
    const filters = useSelector(state => state.filters.filters)
    const { updateHeroId, heroes } = useSelector(state => state.heroes)

    useEffect(() => {
        getHeroInfo()
    }, [updateHeroId])

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
        if (updateHeroId) {
            dispatch(setIdUpdateHero(null))
        }
    }

    function onCreateHero(event) {
        event.preventDefault()
        if (!(name && description && element)) return
        const hero = {
            id: uuidv4(),
            name,
            description,
            element
        }
        dispatch(createHero(hero))
        clearForm()
    }

    function onUpdateHero(event) {
        event.preventDefault()
        const hero = {
            id: updateHeroId,
            name,
            description,
            element
        }
        dispatch(updateHero(hero))
        clearForm()
    }

    function getOptions() {
        return filters.map(({ filter, lable }) => {
            return <option value={filter} key={filter}>{lable}</option>
        })
    }

    function getHeroInfo() {
        if (!updateHeroId) return
        const hero = heroes.find(({ id }) => id === updateHeroId)
        setName(hero.name)
        setDescription(hero.description)
        setElement(hero.element)
        setSelectedHero(hero)
    }

    function checkUpdateHeroInfo() {
        return name === selectedHero.name
            && description === selectedHero.description
            && element === selectedHero.element
    }

    const nameLable = updateHeroId ? 'Имя героя' : 'Имя нового героя'
    const elementLable = updateHeroId ? 'Изменить элемент героя' : 'Выбрать элемент героя'
    const buttonLable = updateHeroId ? 'Обновить' : 'Создать'

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">{nameLable}</label>
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
                <label htmlFor="element" className="form-label">{elementLable}</label>
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
                disabled={!(name && description && element) || checkUpdateHeroInfo()}
                onClick={updateHeroId ? onUpdateHero : onCreateHero}
            >
                {buttonLable}
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                style={{ marginLeft: '20px' }}
                disabled={!(name || description || element)}
                onClick={clearForm}
            >Очистить форму</button>
        </form>
    )
}

export default HeroesAddForm;