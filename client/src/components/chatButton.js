import React from "react";
import { Button } from "react-bootstrap";
import { Translate } from "react-i18nify";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAuthenticated } from "../atoms/auth";

function ChatButton({ nurseryId }) {
	const _isUserAuthenticated = useRecoilValue(isUserAuthenticated);
	return _isUserAuthenticated ? (
		<Button size="sm" as={Link} to={`/user/chat/${nurseryId}/`}>
			<Translate value="chatWithNursery" />
		</Button>
	) : (
		<Button size="sm" as={Link} to="/user/sign-in">
			<Translate value="signInToChat" />
		</Button>
	);
}

export default ChatButton;
