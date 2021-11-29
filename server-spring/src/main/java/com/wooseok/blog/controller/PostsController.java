package com.wooseok.blog.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/posts")
public class PostsController {

    @GetMapping
    public String list() {
        return "list";
    }

    @PostMapping
    public String write() {
        return "write";
    }

    @GetMapping("/{id}")
    public String read(@PathVariable String id) {
        return "read";
    }

    @PatchMapping("/{id}")
    public String update(@PathVariable String id) {
        return "update";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable String id) {
        return "delete";
    }
}
