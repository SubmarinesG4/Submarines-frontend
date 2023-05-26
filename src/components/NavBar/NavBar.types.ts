import React from "react";

export type UseNavBarOptions = {};

export type UseNavBarReturn = {
	signOut: () => void;
};

export type UseNavBar = (options: UseNavBarOptions) => UseNavBarReturn;

export type NavBarProps = {};

export type NavBarView = React.FC<NavBarProps>;
