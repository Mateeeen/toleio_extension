//@ts-ignore
import { Player, ControlBar, PlayToggle } from "video-react"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { RootState, Dispatch } from "../redux/store"
import styled from "styled-components"
import btnSlowDefault from "../assets/btns/Btn_slow_default.png"
import btnSlowActive from "../assets/btns/Btn_slow_active.png"

import "video-react/styles/scss/video-react.scss"
import "../css/player.scss"

const Container = styled.div`
  display: flex;
  padding: 8px;
  height: 388px;
  border-radius: 12px;
  background: white;
  margin-top: 17px;
`

const BtnSlow = styled.div<{
  slow: boolean
}>`
  display: flex;
  outline: none;
  cursor: pointer;
  width: 45px;
  height: 45px;
  background: ${({ slow }) =>
    slow ? `url(${btnSlowActive})` : `url(${btnSlowDefault})`};
  background-size: 45px;
  margin-top: 6px;
`

const SlowToggler: React.FC<{
  slow: boolean
  onClick: (e: React.MouseEvent) => void
}> = ({ slow, onClick }) => {
  return (
    <div className="video-react-slow-control-container" onClick={onClick}>
      <BtnSlow slow={slow} />
      <label>Slow mode: {slow ? "ON" : "OFF"}</label>
    </div>
  )
}

const PlayToggler: React.FC<{ isPlaying: boolean }> = ({
  isPlaying,
  ...props
}) => {
  return (
    <div className="video-react-play-control-container">
      <PlayToggle {...props} />
      <label>{isPlaying ? "Pause" : "Play"}</label>
    </div>
  )
}

const VideoPlayer: React.FC = () => {
  const foundWord = useSelector((state: RootState) => state.modal.foundWord)
  const isPlaying = useSelector((state: RootState) => state.modal.isPlaying)
  const slow = useSelector((state: RootState) => state.modal.slow)

  const dispatch = useDispatch<Dispatch>()

  if (!foundWord) return null
  return (
    <Container>
      <Player
        key="toleio-video"
        ref={(node: HTMLMediaElement) => {
          if (node) {
            node.playbackRate = slow ? 0.5 : 1
          }
        }}
        className="toleio-player"
        autoPlay
        onPlay={() => dispatch.modal.setIsPlaying(true)}
        onPause={() => dispatch.modal.setIsPlaying(false)}
        muted
        playsInLine
        src={foundWord.url}
      >
        <ControlBar autoHide={false} disableDefaultControls={true}>
          <PlayToggler isPlaying={isPlaying} />
          <SlowToggler slow={slow} onClick={dispatch.modal.toggleSlow} />
        </ControlBar>
      </Player>
    </Container>
  )
}

export default VideoPlayer
