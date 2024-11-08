import { model, Schema } from "mongoose";
import { IComment } from "../interface/IComment";



const CommentSchema = new Schema<IComment>({
    userID: { type: Schema.Types.ObjectId, ref:'Usuario' },
    userName: { type: String},
    comment: { type: String, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
})


CommentSchema.methods.toJSON = function(){
    const { __v, _id, ...comment } = this.toObject();
    comment.id = _id;
    return comment;
}

const Comment = model('Comment',CommentSchema);
export default Comment;