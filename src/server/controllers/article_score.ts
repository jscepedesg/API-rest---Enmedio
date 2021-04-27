import { Router, Request, Response } from 'express';
import _ = require('underscore');
import ArticleScore from '../models/article_score';
const CArticleScore = Router();

/**
 * @description Method for creating article_score.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticleScore.post( '/article_score', ( req: Request, res: Response ) => {
    let body = req.body;

    let article_score = new ArticleScore({
        article_id: body.article_id,
        customer_id: body.customer_id,
        score: body.score
    });

    article_score.save((err: any, articleScoreDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            article_score: articleScoreDB
        });
    });
});

/**
 * @description Method to get all article_score.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticleScore.get( '/article_score', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    ArticleScore.find({state: true})
            .skip(from)
            .limit(limit)
            .populate('article_id', 'name')
            .populate('customer_id', ['firstname', 'lastname'])
            .exec((err, article_score) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                ArticleScore.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        article_score,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to article_score by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticleScore.get( '/article_score/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error article_score doesn't exist"});
    }

        ArticleScore.findById(id)
                    .populate('article_id', 'name')
                    .populate('customer_id', ['firstname', 'lastname'])
                    .exec((err: any, article_score: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! article_score ) return res.status(404).json({message: "Error article_score doesn't exist"});

            return res.status(200).json({
                ok: true,
                article_score
            });

        });
});

/**
 * @description Method that updates the attributes of a article_score.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticleScore.put( '/article_score/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['article_id', 'customer_id', 'score', 'state']);

    ArticleScore.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, articleScoreDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! articleScoreDB) return res.status(404).json({message: "Error article_score doesn't exist"});

        res.json({
            ok: true,
            article_score: articleScoreDB
        });
    });
});

/**
 * @description Method that delete a article_score.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticleScore.delete( '/article_score/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    ArticleScore.findByIdAndUpdate( id, changeState, {new: true}, (err, articleScoreDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(articleScoreDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'article_score not found'
                    }
                });
            }
            res.json({
                ok: true,
                article_score: articleScoreDelete
            });
    });
});

export default CArticleScore;