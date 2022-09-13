import React, { useEffect, useState } from 'react';

import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import 'react-native-gesture-handler';
import { auth, db } from '../firebase';

export default function Profile() {
	const [details, setDetails] = useState([]);

	//* to get the name of the user
	const getUserData = async () => {
		try {
			var user = auth.currentUser;
			var uid;
			if (user != null) {
				uid = user.uid;
			}
			db.collection('users')
				.doc(uid)
				.get()
				.then((querySnapshot) => {
					setDetails(querySnapshot.data());
				});
		} catch (error) {
			alert(error);
		}
	};

	useEffect(() => {
		getUserData();
	}, []);

	return (
		<View style={styles.body}>
			<Text style={styles.text}>Personal data</Text>
			<View style={styles.category}>
				<Text style={styles.innerText}>Name: {details.Name}</Text>

				<View
					style={{
						borderBottomColor: '#928e8e',
						borderBottomWidth: 1,
						marginBottom: 10,
					}}
				/>
				<Text style={styles.innerText}>Email: {details.Email}</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	body: {
		flex: 1,
	},
	text: {
		color: '#000000',
		fontSize: 30,
		marginLeft: 10,
		paddingTop: 20,
	},
	category: {
		margin: 10,
		borderWidth: 2,
		borderColor: '#a1a1a1',
	},
	innerText: {
		margin: 10,
		marginBottom: 15,
		fontSize: 20,
	},
});
