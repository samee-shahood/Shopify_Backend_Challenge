import React, { Component } from 'react';
import axios from 'axios';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class Image extends Component {
    constructor(props) {
        super(props);
        this.state = {
			img: [],
			selectedFile: null
        };
	};
	
    arrayBufferToBase64(buffer) {
        var binary = '';
        var bytes = [].slice.call(new Uint8Array(buffer));
        bytes.forEach((b) => binary += String.fromCharCode(b));
        return window.btoa(binary);
	};
	
    componentDidMount() {
		axios({
			method: 'get',
			url: 'http://localhost:5000/images/retrieve',
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		  
		})        
        .then((res) => {
			console.log(res.data.images[0]);
			for(var i in res.data.images){
				var base64Flag = 'data:image/jpeg;base64,';
				var imageStr = this.arrayBufferToBase64(res.data.images[i].img.data.data);
				this.setState(prevState => ({
					img: [...prevState.img, 
						{image: base64Flag+imageStr,
						id:res.data.images[i]._id}]
				}))
				console.log(res.data.images[i].img.data.data);
			}
		})
	}

	onChangeHandler=event=>{
		var files = event.target.files
			this.setState({
			selectedFile: files,
			loaded:0
			})
		
	}
	onClickHandler = () => {
		const data = new FormData() 
		

		for(var x = 0; x<this.state.selectedFile.length; x++) {
			data.append('file', this.state.selectedFile[x])
		}
		data.append("permissions", "private")


		axios({
			method: 'post',
			url: "http://localhost:5000/images/upload",
			data: data,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		})
			.then(res => { // then print response status
				toast.success('upload success')
			})
			.catch(err => { // then print response status
				console.log(err);
				toast.error('upload fail')
			})
		}
	
	
	
	handleInput(e) {
		console.log(e.target.value);

		axios({
			method: 'delete',
			url: 'http://localhost:5000/images/'+e.target.value+'/delete', //dummy user,
			headers: {
				Authorization: "Bearer " + localStorage.getItem("token")
			}
		})
		.then(response=> {
			window.location.reload();
		})
	}

    render() {
        return (

			
			<div
				className="keyboardRow roundBorder"
				value={"example"}
			>

				<div class="container">
					<div class="row">
						<div class="offset-md-3 col-md-6">
							<div class="form-group files">
								<label>Upload Your File </label>
								<input type="file" class="form-control" multiple onChange={this.onChangeHandler}/>
							</div>  
							<div class="form-group">
							<ToastContainer />
							<Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
						
							</div> 
							
							<button type="button" class="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>

						</div>
					</div>
				</div>


				<table>
					<thead>
						<th>Image</th>
					</thead>
					{this.state.img.map((item =>
					<tr>
						
						<td>
							<img
							src={item.image}
							alt='Failed to load image'/>
						</td>
						<td>
							<button value={item.id} onClick={e => this.handleInput(e, "value")}>Delete</button>

						</td>
						{/* <td>
							<button value={item.id}>Delete</button>
						</td> */}
					</tr>
					))}
				</table>
			</div>
        )
	}
}
	
export default Image;
