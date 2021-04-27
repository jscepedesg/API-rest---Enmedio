import { Router, Request, Response } from 'express';
import _ = require('underscore');
import Article from '../models/article';
const CArticle = Router();

/**
 * @description Method for creating article.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticle.post( '/article', ( req: Request, res: Response ) => {
    let body = req.body;

    let article = new Article({
        name: body.name,
        price: body.price,
        image: body.image
    });

    article.save((err: any, articleDB: any) => {
        if(err){
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            article: articleDB
        });
    });
});

/**
 * @description Method to get all article.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticle.get( '/article', ( req: Request, res: Response ) => {
    let from = req.query.from || 0;
    from = Number(from);

    let limit = req.query.limit || 15;
    limit = Number(limit);

    Article.find({state: true})
            .skip(from)
            .limit(limit)
            .exec((err, article) => {
                if(err) {
                    return res.status(400).json({
                        ok: false,
                        err
                    });
                }

                Article.countDocuments({state: true}, (err, count) => {
                    res.json({
                        ok: true,
                        article,
                        howMany: count
                    });
                });
            });
});

/**
 * @description Method to article by id.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticle.get( '/article/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    if(id == null)
    {
        return res.status(404).json({message: "Error article doesn't exist"});
    }

        Article.findById(id, (err: any, article: any) => {

            if(err) {return res.status(500).json({message: 'Error returning data'});}

            if(! article ) return res.status(404).json({message: "Error article doesn't exist"});

            return res.status(200).json({
                ok: true,
                article
            });

        });
});

/**
 * @description Method that updates the attributes of a article.
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticle.put( '/article/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;
    let body =_.pick( req.body, ['name', 'price', 'image', 'state']);

    Article.findByIdAndUpdate( id, body, {new: true, runValidators: false}, (err, articleDB) => {

        if(err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if(! articleDB) return res.status(404).json({message: "Error article doesn't exist"});

        res.json({
            ok: true,
            article: articleDB
        });
    });
});

/**
 * @description Method that delete a article.
 * 02/05/2020
 * @author jsCespedesg
 * @version 1.0.0
 */
CArticle.delete( '/article/:id', ( req: Request, res: Response ) => {
    let id = req.params.id;

    let changeState = {
        state: false
    };
    Article.findByIdAndUpdate( id, changeState, {new: true}, (err, companyDelete) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            if(companyDelete === null){
                return res.status(400).json({
                    ok: false,
                    err: {
                        message: 'article not found'
                    }
                });
            }
            res.json({
                ok: true,
                article: companyDelete
            });
    });
});

export default CArticle;