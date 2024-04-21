'use client';
import styles from '@/app/loader.module.css';
import React from 'react';
const Loader = (props: { classProp?: string }) => {
  const { classProp } = props;
  return <div id='steering' className={classProp}></div>;
};

export default Loader;
