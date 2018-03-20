import React from "react";
import { connect } from "react-redux";

import { UserStatusType } from "core";
import { readyToFight } from "../../actions/dashboard";

import StatusBadge from "./StatusBadge";
import OpponentsList from "./OpponentsList";
import UserInfo from "./UserInfo";

import { getUserInfo } from "../../selectors/user"
import { getOtherUsers } from "../../selectors/users"

interface PropTypes {
  user: {
    email: string;
    name: string;
    status: UserStatusType;
    rate: number;
  };
  opponents: { name; status }[];
  readyToFight: Function;
  history: any;
}

export class Dashboard extends React.Component<PropTypes> {
  toggle = ev => {
    const { readyToFight, user, history } = this.props;

    switch (user.status) {
      case UserStatusType.Peace:
        return readyToFight();
    }
  };

  render() {
    const { opponents, user } = this.props;

    return (
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
    );
  }
}

function mapStateToProps(state) {
  return {
    user: getUserInfo(state),
    opponents: getOtherUsers(state)
  };
}

export default connect(mapStateToProps, { readyToFight })(Dashboard as any);
