import React from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isUserAuthenticated } from "../atoms/auth";

function ChatButton({ nurseryId }) {
	const _isUserAuthenticated = useRecoilValue(isUserAuthenticated);
	return _isUserAuthenticated ? (
		<Button size="sm" as={Link} to={`/user/chat/${nurseryId}/`}>
			Chat with Nursery
		</Button>
	) : (
		<Button size="sm" as={Link} to="/user/sign-in">
			Sign in to Chat
		</Button>
	);
}

export default ChatButton;
