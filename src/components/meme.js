import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components/macro';
import { Text } from 'rebass';

import 'typeface-oswald';

import { githubUrl } from '../utils/links';

const MemeText = styled(Text)`
  position: absolute;
  width: 100%;
  bottom: ${props => (props.verticalAlign === 'bottom' ? 0 : undefined)};
  color: white;
  font-family: 'Impact', 'Oswald', sans-serif;
  font-weight: 700;
  white-space: pre-wrap;
  text-align: left;
  text-transform: uppercase;
  -webkit-text-stroke: 1px black;
  text-shadow: 3px 3px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000,
    -1px 1px 0 #000, 1px 1px 0 #000;
`;
MemeText.defaultProps = {
  verticalAlign: 'top',
};

const MemeAttributionText = styled(Text)`
  position: absolute;
  bottom: 0;
  right: 0;
  color: #333;
  font-family: 'Oswald', sans-serif;
  font-size: 9px;
  font-weight: 400;
  background: rgba(255, 255, 255, 0.7);
  padding: 1px 2px;
  text-decoration: none;
`;

const Meme = ({
  imageSrc,
  topLabel,
  bottomLabel,
  isMobile,
  onLoad,
  forwardedRef,
}) => {
  const [dimensions, setDimensions] = useState({});

  useEffect(() => {
    const image = new Image();
    const maxWidth = isMobile ? 350 : 600;

    image.onload = () => {
      let { width, height } = image;
      if (image.width > maxWidth) {
        height = (maxWidth * height) / width;
        width = maxWidth;
      }
      setDimensions({ width, height });
      onLoad();
    };
    image.src = imageSrc;
  }, [imageSrc, isMobile, onLoad]);

  const textProps = {
    fontSize: isMobile ? 2 : 5,
    p: isMobile ? 2 : 4,
  };

  return (
    <svg {...dimensions} ref={forwardedRef}>
      <image xlinkHref={imageSrc} width="100%" height="100%" />
      <switch>
        <foreignObject
          width="100%"
          height="100%"
          style={{ position: 'absolute' }}
        >
          <MemeText  {...textProps}>{topLabel}</MemeText>

          <MemeText verticalAlign="bottom" {...textProps}>
            {bottomLabel}
          </MemeText>

          <MemeAttributionText as="a" href={githubUrl} target="_blank">
            Generated by 企開啲啦meme
          </MemeAttributionText>
        </foreignObject>
      </switch>
    </svg>
  );
};

Meme.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  topLabel: PropTypes.string,
  bottomLabel: PropTypes.string,
  isMobile: PropTypes.bool,
  onLoad: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

Meme.defaultProps = {
  isMobile: false,
  onLoad: () => null,
};

const MemeWithRef = forwardRef((props, ref) => (
  <Meme {...props} forwardedRef={ref} />
));
MemeWithRef.displayName = 'Meme';

export default MemeWithRef;
