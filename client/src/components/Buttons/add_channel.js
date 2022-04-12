import { useState } from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "./styles.module.css";

const Buttons = () => {
	const [data, setData] = useState({ source_url: "", source: "", home: "", category: "" });
	const [error, setError] = useState("");

	let navigate = useNavigate()

	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const url = "/api/channel/add_channel";
			const { data: res } = await axios.post(url, data);
			localStorage.setItem("token", res.accessToken);
			// if (res.role === "user"){
			// 	window.location = '/'
			// }
			// else if (res.role === "editor"){
			// 	window.location = '/editor'
			// }

		} catch (error) {
			if (
				error.response &&
				error.response.status >= 400 &&
				error.response.status <= 500
			) {
				setError(error.response.data.message);
			}
		}
	};

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Add Your Channel</h1>
						<input
							type="url"
							placeholder="url"
							name="source_url"
							onChange={handleChange}
							value={data.source_url}
							required
							className={styles.input}
						/><input
            type="text"
            placeholder="Source Name"
            name="source"
            onChange={handleChange}
            value={data.source}
            required
            className={styles.input}
          />
          <input
							type="url"
							placeholder="home page"
							name="home"
							onChange={handleChange}
							value={data.home}
							required
							className={styles.input}
						/>
						<input
							type="text"
							placeholder="Category"
							name="category"
							onChange={handleChange}
							value={data.category}
							required
							className={styles.input}
						/>
						{error && <div className={styles.error_msg}>{error}</div>}
						<button type="submit" className={styles.green_btn}>
							Add Channel
						</button>
					</form>
				</div>
          {/* <div className={styles.right}>
            <h1>New Here ?</h1>
            <Link to="/signup">
              <button type="button" className={styles.white_btn}>
                Sign Up
              </button>
            </Link>
          </div> */}
			</div>
		</div>
	);
};

export default Buttons;
