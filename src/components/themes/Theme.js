import React, { Component } from 'react';
import styled from 'styled-components';
import { ThemeBox } from '../Styles';
import SlidesIMG from './static/slides.png';
import MusicIMG from './static/music.png';
import PhotosIMG from './static/photos.png';
import Switch, { Case, Default } from 'react-switch-case';

const ThemeImage = styled.img `
  max-height: 297;
  width: 100%;
  padding: 0;
  border: 5px solid white;
  margin-bottom: 30px;

  &:hover {
    border: 5px solid #E58E73;
  }
`

const TitleTheme = styled.p `
  text-align: left;
`

class Theme extends Component {
  constructor(props){
    super(props);
    this.state = {
      type: this.props.type,
      name: this.props.name,
    }
  }

  render() {
    const { type, name } = this.state;
    let componentShow = type;

    return (
      <ThemeBox>
        <div onClick={() => this.props.click()}>
        <Switch condition={componentShow}>
          <Case value={'photo'}>
            <TitleTheme> {name} </TitleTheme>
            <ThemeImage src={PhotosIMG} />
          </Case>
          <Case value={'slides'}>
            <TitleTheme> {name} </TitleTheme>
            <ThemeImage src={SlidesIMG}  />
          </Case>
          <Case value={'music'}>
            <TitleTheme> {name} </TitleTheme>
            <ThemeImage src={MusicIMG} />
          </Case>
        </Switch>

        </div>



      </ThemeBox>
    )
  }
}

export default Theme;
