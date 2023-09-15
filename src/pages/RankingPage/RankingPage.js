import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { blue, green, red, yellow } from "@mui/material/colors";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import fotoProfile4 from "../../images/foto8.jpg"
import { AuthContext } from '../../contexts/AuthContext';

const defaultTheme = createTheme();

const RankingPage = () => {
    const [users, setUsers] = useState([]);
    const [rankingPosition, setRankingPosition] = useState('');
    const [showComponent, setShowComponent] = useState(false);
    const { profile } = useContext(AuthContext);

    const Ranking = async () => {
        try {
            const response = await axios.get('http://localhost:3001/users');
            const sortedUsers = response.data.sort((a, b) => b.balance - a.balance);
            const topUsers = sortedUsers.slice(0, 10);
            setUsers(topUsers);
        } catch (error) {
            console.error('Error al elaborar el Ranking', error);
        }
    };

    useEffect(() => {
        Ranking();
    }, []);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                const sortedUsers = response.data.sort((a, b) => b.balance - a.balance);
                const playerPosition =
                    sortedUsers.findIndex((user) => user._id === profile._id) + 1;
                setRankingPosition(playerPosition);

                if (playerPosition > 10) {
                    setShowComponent(true);
                } else {
                    setShowComponent(false);
                }
            } catch (error) {
                console.error('Error al obtener la posición del jugador en el ranking', error);
            }
        };
        fetchUsers();
    }, [profile]);


    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: green[500],
            color: "black",
            fontWeight: "bold",
            fontSize: 20,
            textShadow: "5px 5px 7px #5b2b5b",
            fontFamily: "serif",
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    return (
        <div>
            < ThemeProvider theme={defaultTheme} >
                <GlobalStyles
                    styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
                />
                <CssBaseline />
                <div
                    style={{
                        minHeight: '100vh',
                        backgroundImage: `url(${fotoProfile4})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'auto',
                    }}
                >
                    <Container
                        disableGutters
                        maxWidth="sm"
                        component="main"
                        sx={{ pt: 8, pb: 6 }}
                    >
                        <Typography
                            align="center"
                            color="text.primary"
                            gutterBottom
                            sx={{
                                fontFamily: 'Roboto, sans-serif',
                                fontSize: "70px",
                                textShadow: "2px 3px 5px #5b5b5b",
                                color: green[500],
                            }}
                        >
                            <h1 sx={{ color: green[500] }}><span sx={{ color: green[500] }}>
                                Ranking</span><span>
                                </span></h1>
                        </Typography>
                        <Typography
                            variant="h3"
                            align="center"
                            color="white"
                            component="p"
                        >
                            TOP 10
                        </Typography>
                    </Container>
                    <TableContainer
                        component={Paper} style={{ backgroundColor: 'rgb(220,220,220, 0.5)' }}
                    >
                        <Table>
                            <TableHead >
                                <TableRow >
                                    <StyledTableCell align="center"> PUESTO</StyledTableCell>
                                    <StyledTableCell align="center">NOMBRE</StyledTableCell>
                                    <StyledTableCell align="center">BALANCE</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.map((user, index) => (
                                    <StyledTableRow key={user.name}>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: user._id === profile._id ? blue[300] : undefined,
                                            color: user._id === profile._id ? 'white' : undefined,
                                            fontWeight: user._id === profile._id ? 'bold' : undefined,
                                        }}>
                                            {index + 1}
                                        </StyledTableCell>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: user._id === profile._id ? blue[300] : undefined,
                                            color: user._id === profile._id ? 'white' : undefined,
                                            fontWeight: user._id === profile._id ? 'bold' : undefined,
                                        }}>{user.userName}</StyledTableCell>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: user._id === profile._id ? blue[300] : undefined,
                                            color: user._id === profile._id ? 'white' : undefined,
                                            fontWeight: user._id === profile._id ? 'bold' : undefined,
                                        }}>{user.balance} $</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                                {showComponent && (
                                    <StyledTableRow>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: yellow[700]
                                        }}> {rankingPosition.toString()} </StyledTableCell>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: yellow[700]
                                        }}>{profile.userName}</StyledTableCell>
                                        <StyledTableCell align="center" sx={{
                                            backgroundColor: yellow[700]
                                        }}>{profile.balance} $ </StyledTableCell>
                                    </StyledTableRow>
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </ThemeProvider>
        </div>
    );
}

export default RankingPage

