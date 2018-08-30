import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as OrderActions from "../../../../../actions/order-form";
import * as UserActions from "../../../../../actions/user";
import * as FilmsActions from "../../../../../actions/films";

import OrderModal from "../../../OrderModal/OrderModal";

import "./RoomSchema.css";

class RoomSchema extends React.Component {
  static propTypes = {
    user: PropTypes.shape({
      isLoginOrRegisterFetching: PropTypes.bool,
      isAuth: PropTypes.bool,
      error: PropTypes.string,
      info: PropTypes.shape({
        name: PropTypes.string,
        role: PropTypes.string
      })
    }),
    order: PropTypes.shape({
      additional: PropTypes.array,
      error: PropTypes.string,
      fetching: PropTypes.bool,
      isOpened: PropTypes.bool,
      isSuccess: PropTypes.bool,
      selectedAdditionals: PropTypes.array,
      selectedPlace: PropTypes.shape({
        x: PropTypes.number,
        y: PropTypes.number
      })
    }),

    filmsActions: PropTypes.shape({
      onFilmsFilterChange: PropTypes.func,
      onFilmsPageChange: PropTypes.func,
      onFilmsFetching: PropTypes.func,
      onFilmsFailed: PropTypes.func,
      onFilmsSuccess: PropTypes.func,
      onFilmsLoad: PropTypes.func,
      onFilmLoad: PropTypes.func,
      onFilmsChange: PropTypes.func
    }),
    userActions: PropTypes.shape({
      onLoginOrRegisterFetch: PropTypes.func,
      login: PropTypes.func,
      register: PropTypes.func,
      onLogout: PropTypes.func
    }),
    orderActions: PropTypes.shape({
      onOrderFormOpen: PropTypes.func,
      onOrderFormClose: PropTypes.func,
      onSelectedPlaceChanged: PropTypes.func,
      onSelectedAdditionalAdd: PropTypes.func,
      onSelectedAdditionalRemove: PropTypes.func,
      onAdditionalFetching: PropTypes.func,
      onAdditionalSuccess: PropTypes.func,
      onAdditionalFailed: PropTypes.func,
      onOrderSuccess: PropTypes.func,
      loadAdditional: PropTypes.func,
      addNewOrder: PropTypes.func
    })
  };
  static defaultProps = {
    user: {
      isLoginOrRegisterFetching: false,
      isAuth: false,
      error: "",
      info: {
        name: "",
        role: ""
      }
    },
    order: {
      additional: [],
      error: "",
      fetching: false,
      isOpened: false,
      isSuccess: false,
      selectedAdditionals: [],
      selectedPlace: {
        x: null,
        y: null
      }
    },

    userActions: {
      onLoginOrRegisterFetch: () => {},
      login: () => {},
      register: () => {},
      onLogout: () => {}
    },
    filmsActions: {
      onFilmsFilterChange: () => {},
      onFilmsPageChange: () => {},
      onFilmsFetching: () => {},
      onFilmsFailed: () => {},
      onFilmsSuccess: () => {},
      onFilmsLoad: () => {},
      onFilmsChange: () => {},
      onFilmLoad: () => {}
    },
    orderActions: {
      onOrderFormOpen: () => {},
      onOrderFormClose: () => {},
      onSelectedPlaceChanged: () => {},
      onSelectedAdditionalAdd: () => {},
      onSelectedAdditionalRemove: () => {},
      onAdditionalFetching: () => {},
      onAdditionalSuccess: () => {},
      onAdditionalFailed: () => {},
      onOrderSuccess: () => {},
      loadAdditional: () => {},
      addNewOrder: () => {}
    }
  };

  openOrderModal = event => {
    const target = event.target;

    const columnIndex = parseInt(target.getAttribute("data-column"), 10);
    const rowIndex = parseInt(target.getAttribute("data-row"), 10);

    if (
      target.classList.contains("selected") ||
      target.classList.contains("selected-love-seats") ||
      target.classList.contains("selected-vip")
    )
      return;

    this.props.orderActions.onSelectedPlaceChanged(rowIndex, columnIndex);
    this.props.orderActions.onOrderFormOpen({});
  };

  isSelected = (x, y) => {
    const { user } = this.props;
    const { pendingPlaces, selectedPlaces } = this.props.currentSeance;

    for (let i = 0; i < pendingPlaces.length; i++)
      if (
        pendingPlaces[i].x === x &&
        pendingPlaces[i].y === y &&
        pendingPlaces[i].author !== user.info.id
      )
        if (
          new Date(pendingPlaces[i].removeAt).getTime() > new Date().getTime()
        )
          return true;

    for (let i = 0; i < selectedPlaces.length; i++)
      if (selectedPlaces[i].x === x && selectedPlaces[i].y === y) return true;
  };

  render() {
    const { user, order, filmsActions, userActions, orderActions } = this.props;

    const schema = this.props.currentSeance.cinema.roomSchema;

    return (
      <div className="room-schema">
        <OrderModal
          filmsActions={filmsActions}
          order={order}
          userActions={userActions}
          orderActions={orderActions}
          close={orderActions.onOrderFormClose}
          isOpen={order.isOpened}
          isAuth={user.isAuth}
        />

        <div className="room-schema__screen">Screen</div>
        {schema.map((row, rowIndex) => (
          <div key={rowIndex} className="room-schema__row">
            <div className="row-index">{rowIndex}</div>
            {row.map((item, columnIndex) => {
              if (item === 2 && row[columnIndex - 1] === 2) return null;

              if (
                item === 3 &&
                (row[columnIndex - 1] === 3 || row[columnIndex - 2] === 3)
              )
                return null;

              // save additionally class name
              // [ none, love-seats, vip ]
              let additionally = "";

              if (item === 0) additionally = "none";
              if (item === 1) additionally = "";
              if (item === 2 && row[columnIndex + 1] === 2)
                additionally = "love-seats";
              if (
                item === 3 &&
                row[columnIndex + 1] === 3 &&
                row[columnIndex + 2] === 3
              )
                additionally = "vip";

              if (item === 1 && this.isSelected(rowIndex, columnIndex))
                additionally += " selected";
              if (item === 2 && this.isSelected(rowIndex, columnIndex))
                additionally += " selected-love-seats";
              if (item === 3 && this.isSelected(rowIndex, columnIndex))
                additionally += " selected-vip";

              return (
                <div
                  key={columnIndex}
                  data-column={columnIndex}
                  data-row={rowIndex}
                  onClick={this.openOrderModal}
                  className={"room-schema__row-item " + additionally}
                />
              );
            })}
            <div className="row-index">{rowIndex}</div>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    order: state.orderForm
  };
};

const mapDispatchToProps = dispatch => {
  return {
    filmsActions: bindActionCreators(FilmsActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch),
    orderActions: bindActionCreators(OrderActions, dispatch)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RoomSchema);
