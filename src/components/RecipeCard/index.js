import React from 'react';
import PropTypes from 'prop-types';

import {
  StyledLink,
  StyledCard,
  StyledCardMedia,
  StyledCardContent,
  RecipeTitle
} from './styles';

function RecipeCard({ id, name, photo, style }) {
  return (
    <StyledCard style={ style } component={ StyledLink } to={ `/recipe/${id}` }>
      <StyledCardMedia
        image={ photo }
        title={ name }
      />
      <StyledCardContent>
        <RecipeTitle component="span" variant="body1" color="textPrimary">
          { name }
        </RecipeTitle>
      </StyledCardContent>
    </StyledCard>
  );
}

RecipeCard.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
  style: PropTypes.object.isRequired
}

export default RecipeCard;
