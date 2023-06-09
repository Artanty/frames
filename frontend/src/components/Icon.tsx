import React, { ChangeEventHandler, useEffect, useState } from 'react';
import styles from '@styles/components/icon.scss';
import { TColor } from '../types/main';
import Arrow from "@components/icons/chevron-left-o.svg";
import Search from "@components/icons/search.svg";
import Trending from "@components/icons/trending.svg";
import TrendingDown from "@components/icons/trending-down.svg";
import FilterOff from "@components/icons/filter-off.svg";
import Plus from "@components/icons/math-plus.svg";
import Folder from "@components/icons/folder.svg";
import FolderAdd from "@components/icons/folder-add.svg";
import ChevronDown from "@components/icons/chevron-down.svg";
import ArrowRight from "@components/icons/arrow-right.svg";
import Note from "@components/icons/note.svg";
import Bell from "@components/icons/bell.svg";
import More from "@components/icons/more.svg";
import Music from "@components/icons/music.svg";
import Audio from "@components/icons/audio.svg";
import Video from "@components/icons/video.svg";
import Image from "@components/icons/image.svg";
import Options from "@components/icons/options.svg";
import Bolt from "@components/icons/bolt.svg";
import Comment from "@components/icons/comment.svg";
import Chart from "@components/icons/chart.svg";
import Profile from "@components/icons/profile.svg";
import Upload from "@components/icons/upload.svg";
import ArrowsWidthPlus from "@components/icons/arrowsWidthPlus.svg";
import ArrowsWidthMinus from "@components/icons/arrowsWidthMinus.svg";
import CloseO from "@components/icons/close-o.svg";
import Close from "@components/icons/close.svg";

interface IIcon {
  icon: string, 
  wrapper?: string,
  size?: number,
  color?: TColor
}

export default function Icon ({ icon, wrapper='iconWrapper', size=100, color='softgrey' }: IIcon) {
  const sizeClass = `size${size}` as keyof typeof styles
  const colorClass = `color${color}` as keyof typeof styles
  const classes = `${styles[sizeClass]} ${wrapper} color${color}`


  const toggleSideBar = () => {}
  const iconComponent = () => {
    switch(icon) {
      case "closeLeft": return <Arrow className={styles.icon} onClick={toggleSideBar}></Arrow>;
      case "search": return <Search className={styles.icon} onClick={toggleSideBar}></Search>;
      case "trending": return <Trending className={styles.icon} onClick={toggleSideBar}></Trending>;
      case "trendingDown": return <TrendingDown className={styles.icon} onClick={toggleSideBar}></TrendingDown>;
      case "filterOff": return <FilterOff className={styles.icon} onClick={toggleSideBar}></FilterOff>;
      case "plus": return <Plus className={styles.icon} onClick={toggleSideBar}></Plus>;
      case "folder": return <Folder className={styles.icon} onClick={toggleSideBar}></Folder>;
      case "chevronDown": return <ChevronDown className={styles.icon} onClick={toggleSideBar}></ChevronDown>;
      case "arrowRight": return <ArrowRight className={styles.icon} onClick={toggleSideBar}></ArrowRight>;
      case "note": return <Note className={styles.icon} onClick={toggleSideBar}></Note>;
      case "bell": return <Bell className={styles.icon} onClick={toggleSideBar}></Bell>;
      case "more": return <More className={styles.icon} onClick={toggleSideBar}></More>;
      case "audio": return <Audio className={styles.icon} onClick={toggleSideBar}></Audio>;
      case "music": return <Music className={styles.icon} onClick={toggleSideBar}></Music>;
      case "video": return <Video className={styles.icon} onClick={toggleSideBar}></Video>;
      case "image": return <Image className={styles.icon} onClick={toggleSideBar}></Image>;
      case "options": return <Options className={styles.icon} onClick={toggleSideBar}></Options>;
      case "bolt": return <Bolt className={styles.icon} onClick={toggleSideBar}></Bolt>;
      case "comment": return <Comment className={styles.icon} onClick={toggleSideBar}></Comment>;
      case "chart": return <Chart className={styles.icon} onClick={toggleSideBar}></Chart>;
      case "folderAdd": return <FolderAdd className={styles.icon} onClick={toggleSideBar}></FolderAdd>;
      case "profile": return <Profile className={styles.icon} onClick={toggleSideBar}></Profile>;
      case "upload": return <Upload className={styles.icon} onClick={toggleSideBar}></Upload>;
      case "arrowsWidthPlus": return <ArrowsWidthPlus className={styles.icon} onClick={toggleSideBar}></ArrowsWidthPlus>;
      case "arrowsWidthMinus": return <ArrowsWidthMinus className={styles.icon} onClick={toggleSideBar}></ArrowsWidthMinus>;
      case "closeBorder": return <CloseO className={styles.icon} onClick={toggleSideBar}></CloseO>;
      case "close": return <Close className={styles.icon} onClick={toggleSideBar}></Close>;
      
      
      default: return <span>no icon</span>
    }
  }
   
  return (
    <div className={classes}>{ iconComponent() }</div>
  )
  // return (
  //   <Arrow className={styles.icon} onClick={toggleSideBar}></Arrow>
  // )
}