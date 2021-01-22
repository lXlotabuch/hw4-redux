import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Route, Switch, useLocation } from "react-router-dom";
import { getGoods } from "../state";
import Card from "./Card";
import "./CardsPlace.scss"
import Modal from "./Modal";

const mapStateToProps = (state) => {
    return {
        goods: state.goods,
        showModal: state.modal.showModal
    }
}

const CardsPlace = connect(mapStateToProps, {getGoods})(({goods, showModal, getGoods}) => {
    const [updateList, setUpdateList] = useState(false)
    const {pathname} = useLocation()

    useEffect(() => {
        getGoods()
    }, [pathname])

    return (
        <div className="cards-place">
            <Switch>
                <Route exact path='/'>
                    <ul className="cards-list">
                        {goods.map((el) => (
                            <Card key={el.id} good={el}/>
                        ))}
                    </ul>    
                </Route>
                <Route path='/favorites'>
                    <ul className="cards-list">
                        {goods.map((el) =>
                            localStorage.getItem(`toFavorite-id${el.id}`) !== null ? (
                            <Card key={el.id} good={el} updateList={setUpdateList}/>
                            ) : null,
                        )}
                    </ul>
                </Route>
                <Route path='/cart'>
                    <ul className="cards-list">
                        {goods.map((el) =>
                            localStorage.getItem(`toCart-id${el.id}`) !== null ? (
                            <Card key={el.id} good={el}/>
                            ) : null,
                        )}
                    </ul>
                </Route>
            </Switch>
            {showModal && <Modal 
            header="Do you want add to Cart?"
            />}
        </div>
    )
})


CardsPlace.propTypes = {
    goods: PropTypes.array
}

export default CardsPlace;