import React from 'react'
import {Card,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap'
import {Button,Modal,ModalBody,ModalHeader,Row, Col, Label  } from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import {FadeTransform,Fade,Stagger} from 'react-animation-components'


const required = val => val && val.length;
const maxLength = len => val => !val || val.length <= len;
const minLength = len => val => val && val.length >= len;


class CommentForm extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    isModalOpen: false
	  };
	  this.toggleModal = this.toggleModal.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);
	}
   
	toggleModal() {
	  this.setState({
	    isModalOpen: !this.state.isModalOpen
	  });
	}
   
	handleSubmit(values) {
	  this.toggleModal();
	  this.props.postComment(
	    this.props.dishId,
	    values.rating,
	    values.author,
	    values.comment
	  );
	}
   
	render() {
	  return (
	    <div>
		 <Button outline onClick={this.toggleModal}>
		   <span className="fa fa-pencil" /> Submit Comment
		 </Button>
		 <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
		   <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
		   <ModalBody>
			<LocalForm onSubmit={this.handleSubmit}>
			  <Row className="form-group">
			    <Label htmlFor="rating" md={12}>
				 Rating
			    </Label>
			    <Col md={{ size: 12 }}>
				 <Control.select
				   model=".rating"
				   name="rating"
				   className="form-control"
				 >
				   <option>1</option>
				   <option>2</option>
				   <option>3</option>
				   <option>4</option>
				   <option>5</option>
				 </Control.select>
			    </Col>
			  </Row>
			  <Row className="form-group">
			    <Label htmlFor="author" md={12}>
				 Your Name
			    </Label>
			    <Col md={12}>
				 <Control.text
				   model=".author"
				   id="author"
				   name="author"
				   placeholder="Your Name"
				   className="form-control"
				   validators={{
					required,
					minLength: minLength(3),
					maxLength: maxLength(15)
				   }}
				 />
				 <Errors
				   className="text-danger"
				   model=".author"
				   show="touched"
				   messages={{
					required: "Required",
					minLength: "Must be greater than 2 characters",
					maxLength: "Must be 15 characters or less"
				   }}
				 />
			    </Col>
			  </Row>
			  <Row className="form-group">
			    <Label htmlFor="comment" md={12}>
				 Comment
			    </Label>
			    <Col md={12}>
				 <Control.textarea
				   model=".comment"
				   id="comment"
				   name="comment"
				   rows={5}
				   className="form-control"
				 />
			    </Col>
			  </Row>
			  <Button type="submit" value="submit" color="primary">
			    Submit
			  </Button>
			</LocalForm>
		   </ModalBody>
		 </Modal>
	    </div>
	  );
	}
   }
   

class Dishdetail extends React.Component{
	renderdish(dish){
		return(
		<div className="col-12 col-md-5 m-1">
		<FadeTransform in transformProps={{
			exitTransform:'scale(0.5) translateY(-50%)'
		 }}>
			<Card>
				<CardImg src={this.props.dish.image} alt={this.props.dish.name}/>
				<CardBody>
					<CardTitle>
						{this.props.dish.name}
					</CardTitle>
					<CardText>
						{this.props.dish.description}
					</CardText>
				</CardBody>
			</Card>
		</FadeTransform>
		</div>);
	}
	rendercomments(comments){
			if(comments!=null){
				const commentlistitem=comments.map((comment)=>{
					return(
						<li key={comment.id}>
							<p>{comment.comment}</p>
							<p>{comment.author},{comment.date}</p>
							
						</li>
					)
				})
				return(
					<div className="col-12 col-md-5 m-1">
						<h4>Comments</h4>
						<ul className='list-unstyled'>
						<Stagger in>
						{comments.map((comment) => {
						    return (
							   <Fade in>
							   <li key={comment.id}>
							   <p>{comment.comment}</p>
							   <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
							   </li>
							   </Fade>
						    );
						})}
						</Stagger>
						</ul>
					</div>
				);
			}else{
				return(<div></div>)
			}
	}
	render(){
		
		if(this.props.dish!=null){
			return(
				<div className='row'>
					{this.renderdish(this.props.dish)}
					{this.rendercomments(this.props.dish.comments)}
				</div>
			);
		}else{
			return(<div></div>)
		
		}
	}
}export  default Dishdetail 

