import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
 
const images = [
  {
    url: 'https://blog.scienceandmediamuseum.org.uk/wp-content/uploads/2017/10/Dunkirk-1-1024x680.jpg',
    title: 'Movies',
    width: '25%',
    link: '/addmovies',
  },
  {
    url: 'https://thepotterycove.com/wp-content/uploads/2020/07/Events-and-Workshops-1024x597.png',
    title: 'Events',
    width: '25%',
    link: '/addevents',
  },
  {
    url: 'https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/9895ce70483095.5ba4cb9456be6.jpg',
    title: 'Concerts',
    width: '25%',
    link: '/addconcerts',
  },
];
 
const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 150, 
  margin: theme.spacing(1),
  [theme.breakpoints.down('sm')]: {
    width: '100% !important', 
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));
 
const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});
 
const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));
 
const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));
 
const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));
 
export default function ComplexButton() {
  const navigate = useNavigate();
 
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '80%' ,marginLeft:"280px" , marginTop:"140px"}}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => navigate(image.link)} 
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 2, 
                pt: 1,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
    </Box>
  );
}