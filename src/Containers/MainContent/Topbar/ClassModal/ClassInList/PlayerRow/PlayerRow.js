import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../../../../store/actions/index';
import classes from './PlayerRow.css';
import { IoCamera, IoClose } from 'react-icons/lib/io';
import Dropzone from 'react-dropzone';
import axios from 'axios';

class PlayerRow extends Component {

    updateServer() {
        let classSettings = {
            classSettings: this.props.classSettings
        }

        let id = this.props.auth.classSettingsID;
        let url = "https://nodejs-application.herokuapp.com/school/" + id;
        axios.patch(url, classSettings, { headers: { "X-Auth": this.props.auth.token } })
            .then(response => {
                console.log(response)
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleDrop = files => {
        // Push all the axios request promise into a single array
        const uploaders = files.map(file => {
            // Initial FormData
            const formData = new FormData();
            formData.append("file", file);
            // formData.append("tags", ``);
            formData.append("upload_preset", "facecrop"); // Replace the preset name with your own
            formData.append("api_key", "243487558869839"); // Replace API key with your own Cloudinary key
            formData.append("timestamp", (Date.now() / 1000) | 0);

            // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
            return axios.post("https://api.cloudinary.com/v1_1/dko7vz6gt/image/upload", formData, {
                headers: { "X-Requested-With": "XMLHttpRequest" },
            }).then(response => {
                const data = response.data;
                const fileURL = data.secure_url // You should store this URL for future references in your app

                if (response.status === 200) {
                    this.props.onUploadPhoto(this.props.className, this.props.playerName, fileURL)
                }
                // 
            }).catch(err => {
                console.log( err.message)
            })
        });

        // Once all the files are uploaded 
        axios.all(uploaders).then(() => {
            this.updateServer();
        });
    }


    capitalizer(inStr) {
        inStr = inStr.toLowerCase()
        return inStr.replace(/\w\S*/g, function (tStr) {
            return tStr.charAt(0).toUpperCase() + tStr.substr(1).toLowerCase();
        });
    }

    render() {

        return (
            <div className={classes.PlayerRow} >
                <div className={classes.PlayerName}>{this.capitalizer(this.props.playerName)}</div>
                <div style={{ flexDirection: "row", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    
                    {
                        this.props.playerPhoto[this.props.className][this.props.playerName].photo ?
                            <PlayerPhoto
                                photoUrl={this.props.playerPhoto[this.props.className][this.props.playerName].photo}
                                photoRemover={() => this.props.onRemovePhoto(this.props.className, this.props.playerName)}
                            />
                            : <Dropzone
                                onDrop={this.handleDrop}
                                multiple
                                accept="image/*"
                                className={classes.Dropzone}
                            >
                                <IoCamera className={classes.PhotoIcon} />
                            </Dropzone>
                            
                            
                    }
                    <IoClose className={classes.RemovePlayerIcon} onClick={this.props.onRemovePlayer} />
                </div>
            </div>
        )
    }
};

const PlayerPhoto = (props) => (
    <div className={classes.PlayerPhoto} onClick={props.photoRemover}>
        <img alt={""} src={props.photoUrl} style={{ maxHeight: "100%", maxWidth: "100%", borderRadius: "50%" }} />
    </div>
);

const mapStateToProps = state => {
    return {
        playerPhoto: state.classSettings.playerPhoto,
        classSettings: state.classSettings,
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onUploadPhoto: (className, playerName, fileURL) => dispatch(actions.uploadPhoto(className, playerName, fileURL)),
        onRemovePhoto: (className, playerName) => dispatch(actions.removePhoto(className, playerName))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerRow);