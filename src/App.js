import RecordBoard from "./app/RecordBoard";
import mainPageImage from "./asset/mainpage.png";
import mainPageButton from "./asset/mainpageButton.png";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<div
				className="absolute bottom-5 w-full"
				onClick={() => {
					window.scrollTo(0, window.innerHeight);
				}}
			>
				<img src={mainPageButton} className="m-auto" />
			</div>
			<img src={mainPageImage} className="w-full object-fill h-full" />
			<RecordBoard />
		</ThemeProvider>
	);
}

export default App;
