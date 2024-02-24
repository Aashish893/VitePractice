import styled, {createGlobalStyle} from 'styled-components';
import bgimage from '../images/bgimage.jpg';


export const GlobalStyles = createGlobalStyle`
    html{
    height:100%;
}
body{
    background-image : url(${bgimage});
    background-size : cover;
    margin : 0;
    display : flex;
    justify-content : center;
    padding : 0 20px;
    color : black;
}

*{
    box-sizing : border-box;
}
`;

export const Wrapper = styled.div`
display : flex;
flex-direction : column;
align-items : center;

>p{
    color : #fff;    
}

.score{
    color: red;
    font-size: 2rem;
    margin: 0;
}

h1{
    background-image: linear-gradient(180deg,#282b51,#050e71);
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-background-clip: text;
    -moz-text-fill-color:transparent;
    filter: drop-shadow(2px 2px #0085a3);
    text-align: center;
    margin: 20px;
    font-weight: 500;
}

.start,.next{
    cursor: pointer;
    background: linear-gradient(180deg,#282b51,#050e71);
    border : 2px solid #282b51;
    box-shadow: 0px 5px 10px rgba(0,0,0,0.25);
    border-radius: 10px;
    height: 40px;
    margin: 20px 0;
    padding : 0 40px;
}

.start{
    max-width:200px;
}

`;