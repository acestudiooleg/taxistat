import React from 'react';

interface IProps {
  name: string;
  color: string;
}

const Icon = ({ name, color }: IProps) => <span className={`.material-icons ${name} ${color}`}></span>;

export default Icon;
