//design
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";

//hook
import useCounter from "../hooks/contracts/counter/useCounter";
const counterAddress = "0xAA575347402b7548d68B57fb6079ac482D30f55A";

function Counter() {
	const { count, incrementCounter, decreaseCounter } =
		useCounter(counterAddress);
	return (
		<Container maxWidth="sm">
			<Card sx={{ minWidth: 275, marginTop: 20 }}>
				<CardContent>
					<p>Count: {count}</p>
					<Button onClick={incrementCounter} variant="outlined">
						+1
					</Button>
					<Button onClick={decreaseCounter} variant="outlined">
						-1
					</Button>
				</CardContent>
			</Card>
		</Container>
	);
}

export default Counter;
