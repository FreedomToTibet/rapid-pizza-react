import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";

const getPosition = () => {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("Position data:", position);
        resolve(position);
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("User denied the request for Geolocation."));
            break;
          case error.POSITION_UNAVAILABLE:
            // Fallback to a default location
            resolve({
              coords: {
                latitude: 49.2827, // Example: Vancouver, BC
                longitude: -123.1207,
              },
            });
            break;
          case error.TIMEOUT:
            reject(new Error("The request to get user location timed out."));
            break;
          default:
            reject(new Error("An unknown error occurred."));
            break;
        }
      }
    );
  });
}

export const fetchAddress = createAsyncThunk("userFetchAddress", async () => {
  try {
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    return { position, address };
  } catch (error) {
    console.error("Error fetching address:", error);
    throw error;
  }
});


const initialState = {
	username: "",
	status: "idle",
	position: {},
	address: "",
	error: "",
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.username = action.payload;
		},
	},
	extraReducers: (builder) => {
			builder
				.addCase(fetchAddress.pending, (state) => ({ ...state, status: 'loading' }))
				.addCase(fetchAddress.fulfilled, (state, action) => {
					state.position = action.payload.position;
					state.address = action.payload.address;
					state.status = "idle";
				})
				.addCase(fetchAddress.rejected, (state) => ({
					...state, status: "error", error: 'There was a problem getting your address'
				}));
		},
});

export const { setUser } = userSlice.actions;

export default userSlice.reducer;