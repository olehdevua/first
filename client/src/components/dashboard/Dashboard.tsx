import React from "react";
import { connect } from "react-redux";

import StatusBadge from "./StatusBadge";
import OpponentsList from "./OpponentsList";
import UserInfo from "./UserInfo";

import { readyToFight } from "../../actions/dashboard";
import { opponentsSelector } from "../../selectors/opponents";
import { userInfoSelector } from "../../selectors/user";
import { UserStatusType } from "../../constants";

interface PropTypes {
  user: {
    email: string;
    name: string;
    status: UserStatusType;
    rate: number;
  };
  opponents: { name; status }[];
  readyToFight: Function;
}

export class Dashboard extends React.Component<PropTypes> {
  toggle = ev => {
    const { readyToFight, user } = this.props;

    switch (user.status) {
      case UserStatusType.Peace:
        return readyToFight();
    }
  };

  render() {
    const { opponents, readyToFight, user } = this.props;

    return (
      <div className="row">
        <div className="col col-sm-5 col-md-4 col-lg-3">
          <div className="card">
            <div id="user_name" className="card-header">
              {user.name}
            </div>
            <div id="user_email" className="card-body">
              <UserInfo {...user} />
            </div>
            <div className="card-header">
              <span>Opponents</span>
              <StatusBadge toggle={this.toggle} user_status={user.status} />
            </div>
            <div className="card-body">
              <OpponentsList opponents={opponents} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: userInfoSelector(state),
    opponents: opponentsSelector(state)
  };
}

export default connect(mapStateToProps, {
  readyToFight
})(Dashboard as any);
