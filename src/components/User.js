import React from "react";
import { Card, Image, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "../assets/User.css";

const User = ({ item: user }) => {
  return (
    <Card className="user-card" raised={true}>
      <Card.Content>
        <Link to={`/users/${user.id}`}>
          <Image src={`${user.gravatar_url}`} floated="left" rounded={true} />
          <big className="card-header">
            <Card.Header>
              {user.first_name
                ? user.first_name + " " + user.last_name
                : user.slug.substring(0, 15)}
            </Card.Header>
          </big>
        </Link>
        <p>{user.title_list.length ? user.title_list.map(title => title + " ") : null}</p>
        <p className="card-footer">
          <Icon name='fire' size="large" /> {}
          {user.karma_total}
        </p>
      </Card.Content>
    </Card>
  );
};

export default User;